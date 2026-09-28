import { createHash, randomBytes, timingSafeEqual } from "node:crypto";
import type { PoolClient } from "pg";

import { query, transaction } from "@/lib/db";

const AUTHORIZATION_CODE_SECONDS = 60;

export type SsoClient = {
  id: string;
  secret: string;
  redirectUri: string;
  launchUrl: string;
};

export type SsoIdentity = {
  sub: string;
  username: string;
  workspaceId: number;
  workspaceName: string;
  workspaceSlug: string;
};

function appOrigin(value: string | undefined, fallback: string) {
  const candidate = value?.trim() || fallback;
  const url = new URL(candidate);
  if (url.protocol !== "https:" && !(url.protocol === "http:" && ["localhost", "127.0.0.1"].includes(url.hostname))) {
    throw new Error("The SSO application URL must use HTTPS, except on localhost.");
  }
  return url.origin;
}

export function getSsoClient(clientId: string): SsoClient | null {
  if (clientId !== "analise-equipa") return null;
  const origin = appOrigin(process.env.ANALISE_EQUIPA_URL, "https://analise-equipa.vercel.app");
  return {
    id: clientId,
    secret: process.env.SSO_ANALISE_EQUIPA_CLIENT_SECRET?.trim() || "",
    redirectUri: `${origin}/api/auth/sso/callback`,
    launchUrl: `${origin}/api/auth/sso/start?next=%2F`
  };
}

export function safePortalReturnPath(value: string | null | undefined) {
  if (
    !value ||
    value.length > 2000 ||
    !value.startsWith("/") ||
    value.startsWith("//") ||
    /[\\\r\n]/.test(value)
  ) return "/";
  return value;
}

export function validPkceValue(value: string) {
  return /^[A-Za-z0-9_-]{43,128}$/.test(value);
}

export function pkceChallenge(verifier: string) {
  return createHash("sha256").update(verifier).digest("base64url");
}

export function secureSecretEqual(candidate: string, expected: string) {
  if (!candidate || !expected) return false;
  const left = createHash("sha256").update(candidate).digest();
  const right = createHash("sha256").update(expected).digest();
  return timingSafeEqual(left, right);
}

function codeHash(code: string) {
  return createHash("sha256").update(code).digest("hex");
}

export async function issueAuthorizationCode(input: {
  userId: number;
  clientId: string;
  redirectUri: string;
  codeChallenge: string;
}) {
  const code = randomBytes(32).toString("base64url");
  const expiresAt = new Date(Date.now() + AUTHORIZATION_CODE_SECONDS * 1000);
  await query("DELETE FROM portal_sso_codes WHERE expires_at <= now()", []);
  await query(
    `INSERT INTO portal_sso_codes
      (code_hash, user_id, client_id, redirect_uri, code_challenge, expires_at)
     VALUES ($1, $2, $3, $4, $5, $6)`,
    [codeHash(code), input.userId, input.clientId, input.redirectUri, input.codeChallenge, expiresAt]
  );
  return code;
}

type CodeRow = SsoIdentity & {
  id: string;
  clientId: string;
  redirectUri: string;
  codeChallenge: string;
  expiresAt: Date;
  usedAt: Date | null;
};

async function lockedCode(client: PoolClient, code: string) {
  return client.query<CodeRow>(
    `SELECT
       c.id::text AS id,
       c.client_id AS "clientId",
       c.redirect_uri AS "redirectUri",
       c.code_challenge AS "codeChallenge",
       c.expires_at AS "expiresAt",
       c.used_at AS "usedAt",
       u.sso_subject::text AS sub,
       u.username,
       w.id::int AS "workspaceId",
       w.name AS "workspaceName",
       w.slug AS "workspaceSlug"
     FROM portal_sso_codes c
     JOIN portal_users u ON u.id = c.user_id
     JOIN portal_workspaces w ON w.id = u.workspace_id
     WHERE c.code_hash = $1
     LIMIT 1
     FOR UPDATE OF c`,
    [codeHash(code)]
  );
}

export async function exchangeAuthorizationCode(input: {
  code: string;
  clientId: string;
  redirectUri: string;
  codeVerifier: string;
}): Promise<SsoIdentity | null> {
  return transaction(async (client) => {
    const result = await lockedCode(client, input.code);
    const row = result.rows[0];
    if (
      !row ||
      row.usedAt ||
      row.expiresAt.getTime() <= Date.now() ||
      row.clientId !== input.clientId ||
      row.redirectUri !== input.redirectUri ||
      row.codeChallenge !== pkceChallenge(input.codeVerifier)
    ) {
      return null;
    }

    const consumed = await client.query(
      "UPDATE portal_sso_codes SET used_at = now() WHERE id = $1 AND used_at IS NULL",
      [row.id]
    );
    if (consumed.rowCount !== 1) return null;

    return {
      sub: row.sub,
      username: row.username,
      workspaceId: row.workspaceId,
      workspaceName: row.workspaceName,
      workspaceSlug: row.workspaceSlug
    };
  });
}
