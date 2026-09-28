import { NextResponse } from "next/server";

import {
  exchangeAuthorizationCode,
  getSsoClient,
  secureSecretEqual,
  validPkceValue
} from "@/lib/sso";

function response(body: unknown, status = 200) {
  const result = NextResponse.json(body, { status });
  result.headers.set("Cache-Control", "no-store");
  result.headers.set("Pragma", "no-cache");
  return result;
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json() as Record<string, unknown>;
  } catch {
    return response({ error: "invalid_request" }, 400);
  }

  const clientId = String(body.client_id || "");
  const clientSecret = String(body.client_secret || "");
  const code = String(body.code || "");
  const redirectUri = String(body.redirect_uri || "");
  const codeVerifier = String(body.code_verifier || "");
  const client = getSsoClient(clientId);

  if (!client || !secureSecretEqual(clientSecret, client.secret)) {
    return response({ error: "invalid_client" }, 401);
  }
  if (
    !/^[A-Za-z0-9_-]{43}$/.test(code) ||
    redirectUri !== client.redirectUri ||
    !validPkceValue(codeVerifier)
  ) {
    return response({ error: "invalid_request" }, 400);
  }

  const identity = await exchangeAuthorizationCode({ code, clientId, redirectUri, codeVerifier });
  if (!identity) return response({ error: "invalid_grant" }, 400);
  return response({ identity });
}
