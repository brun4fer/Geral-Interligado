"use server";

import { randomBytes } from "node:crypto";
import { redirect } from "next/navigation";
import { createSession, destroySession, registrationEnabled, requireUser } from "@/lib/auth";
import { query, transaction } from "@/lib/db";
import { hashPassword, verifyPassword } from "@/lib/password";
import { safePortalReturnPath } from "@/lib/sso";

function text(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function password(formData: FormData, key: string) {
  return String(formData.get(key) ?? "");
}

function validUsername(value: string) {
  return /^[\p{L}\p{N}_.-]{3,40}$/u.test(value);
}

function slugFor(name: string) {
  const base = name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 55) || "workspace";
  return `${base}-${randomBytes(4).toString("hex")}`;
}

export async function loginAction(formData: FormData) {
  const username = text(formData, "username");
  const candidate = password(formData, "password");
  if (!username || !candidate || username.length > 80 || candidate.length > 256) {
    redirect("/login?error=invalid");
  }

  const result = await query<{ id: number; password_hash: string }>(
    "SELECT id::int AS id, password_hash FROM portal_users WHERE lower(username) = lower($1) LIMIT 1",
    [username]
  );
  const user = result.rows[0];
  if (!user || !(await verifyPassword(candidate, user.password_hash))) {
    redirect("/login?error=invalid");
  }

  await createSession(user.id);
  redirect(safePortalReturnPath(text(formData, "next")));
}

export async function registerAction(formData: FormData) {
  if (!registrationEnabled()) redirect("/login?error=registration-disabled");
  const workspaceName = text(formData, "workspaceName");
  const username = text(formData, "username");
  const candidate = password(formData, "password");
  const confirmation = password(formData, "confirmPassword");

  if (workspaceName.length < 2 || workspaceName.length > 120) redirect("/register?error=workspace");
  if (!validUsername(username)) redirect("/register?error=username");
  if (candidate.length < 10 || candidate.length > 256 || candidate !== confirmation) {
    redirect("/register?error=password");
  }

  let userId: number;
  try {
    userId = await transaction(async (client) => {
      const duplicate = await client.query("SELECT id FROM portal_users WHERE lower(username) = lower($1) LIMIT 1", [username]);
      if (duplicate.rowCount) throw Object.assign(new Error("Username already exists"), { code: "USERNAME_TAKEN" });

      const workspace = await client.query<{ id: number }>(
        "INSERT INTO portal_workspaces (name, slug) VALUES ($1, $2) RETURNING id::int AS id",
        [workspaceName, slugFor(workspaceName)]
      );
      const created = await client.query<{ id: number }>(
        "INSERT INTO portal_users (workspace_id, username, password_hash) VALUES ($1, $2, $3) RETURNING id::int AS id",
        [workspace.rows[0].id, username, await hashPassword(candidate)]
      );
      return created.rows[0].id;
    });
  } catch (error) {
    const code = (error as { code?: string }).code;
    if (code === "23505" || code === "USERNAME_TAKEN") redirect("/register?error=taken");
    throw error;
  }

  await createSession(userId);
  redirect("/");
}

export async function logoutAction() {
  await destroySession();
  redirect("/login");
}

export async function updateCredentialsAction(formData: FormData) {
  const user = await requireUser();
  const username = text(formData, "username");
  const currentPassword = password(formData, "currentPassword");
  const newPassword = password(formData, "newPassword");
  const confirmation = password(formData, "confirmPassword");

  if (!validUsername(username)) redirect("/account?error=username");
  if (newPassword.length < 10 || newPassword.length > 256 || newPassword !== confirmation) {
    redirect("/account?error=password");
  }

  const current = await query<{ password_hash: string }>("SELECT password_hash FROM portal_users WHERE id = $1", [user.id]);
  if (!current.rows[0] || !(await verifyPassword(currentPassword, current.rows[0].password_hash))) {
    redirect("/account?error=current");
  }

  const duplicate = await query<{ id: number }>(
    "SELECT id::int AS id FROM portal_users WHERE lower(username) = lower($1) AND id <> $2 LIMIT 1",
    [username, user.id]
  );
  if (duplicate.rowCount) redirect("/account?error=taken");

  await query("UPDATE portal_users SET username = $1, password_hash = $2 WHERE id = $3", [
    username,
    await hashPassword(newPassword),
    user.id
  ]);
  await query("DELETE FROM portal_sessions WHERE user_id = $1", [user.id]);
  await createSession(user.id);
  redirect("/account?updated=1");
}
