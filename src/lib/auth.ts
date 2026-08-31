import { createHash, randomBytes, randomUUID } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { query } from "@/lib/db";

const COOKIE_NAME = "ap_portal_session";
const SESSION_SECONDS = 60 * 60 * 24 * 30;

export type PortalUser = {
  id: number;
  username: string;
  workspaceId: number;
  workspaceName: string;
  workspaceSlug: string;
};

function tokenHash(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export async function createSession(userId: number) {
  const token = randomBytes(32).toString("base64url");
  const expiresAt = new Date(Date.now() + SESSION_SECONDS * 1000);

  await query("DELETE FROM portal_sessions WHERE expires_at <= now()");
  await query(
    "INSERT INTO portal_sessions (id, token_hash, user_id, expires_at) VALUES ($1, $2, $3, $4)",
    [randomUUID(), tokenHash(token), userId, expiresAt]
  );

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_SECONDS
  });
}

export async function destroySession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (token) await query("DELETE FROM portal_sessions WHERE token_hash = $1", [tokenHash(token)]);
  cookieStore.delete(COOKIE_NAME);
}

export async function getCurrentUser(): Promise<PortalUser | null> {
  const token = (await cookies()).get(COOKIE_NAME)?.value;
  if (!token) return null;

  const result = await query<PortalUser>(
    `SELECT
       u.id::int AS id,
       u.username,
       w.id::int AS "workspaceId",
       w.name AS "workspaceName",
       w.slug AS "workspaceSlug"
     FROM portal_sessions s
     JOIN portal_users u ON u.id = s.user_id
     JOIN portal_workspaces w ON w.id = u.workspace_id
     WHERE s.token_hash = $1 AND s.expires_at > now()
     LIMIT 1`,
    [tokenHash(token)]
  );

  return result.rows[0] ?? null;
}

export async function requireUser() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  return user;
}

