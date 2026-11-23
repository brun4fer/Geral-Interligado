import { NextRequest, NextResponse } from "next/server";

import { getSsoClient } from "@/lib/sso";

export async function GET(_request: NextRequest, context: { params: Promise<{ clientId: string }> }) {
  const { clientId } = await context.params;
  const client = getSsoClient(clientId);

  if (!client?.secret) {
    return NextResponse.json({ error: "This single sign-on application is not configured yet." }, { status: 503 });
  }

  return NextResponse.redirect(client.launchUrl);
}
