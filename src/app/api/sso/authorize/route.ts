import { NextRequest, NextResponse } from "next/server";

import { getCurrentUser } from "@/lib/auth";
import { getSsoClient, issueAuthorizationCode, safePortalReturnPath, validPkceValue } from "@/lib/sso";

function noStore(response: NextResponse) {
  response.headers.set("Cache-Control", "no-store");
  return response;
}

export async function GET(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    const returnTo = safePortalReturnPath(`${request.nextUrl.pathname}${request.nextUrl.search}`);
    const login = new URL("/login", request.url);
    login.searchParams.set("next", returnTo);
    return noStore(NextResponse.redirect(login));
  }

  const clientId = request.nextUrl.searchParams.get("client_id") || "";
  const redirectUri = request.nextUrl.searchParams.get("redirect_uri") || "";
  const state = request.nextUrl.searchParams.get("state") || "";
  const codeChallenge = request.nextUrl.searchParams.get("code_challenge") || "";
  const method = request.nextUrl.searchParams.get("code_challenge_method") || "";
  const client = getSsoClient(clientId);

  if (
    !client ||
    !client.secret ||
    redirectUri !== client.redirectUri ||
    !/^[A-Za-z0-9_-]{20,200}$/.test(state) ||
    method !== "S256" ||
    !validPkceValue(codeChallenge)
  ) {
    return noStore(NextResponse.json({ error: "Invalid SSO authorization request." }, { status: 400 }));
  }

  const code = await issueAuthorizationCode({
    userId: user.id,
    clientId,
    redirectUri,
    codeChallenge
  });
  const destination = new URL(redirectUri);
  destination.searchParams.set("code", code);
  destination.searchParams.set("state", state);
  return noStore(NextResponse.redirect(destination));
}
