import { NextResponse } from "next/server";

import { getSsoClient } from "@/lib/sso";

export async function GET() {
  const client = getSsoClient("analise-equipa");
  if (!client?.secret) {
    return NextResponse.json({ error: "O login único do AnaliseEQUIPA ainda não está configurado." }, { status: 503 });
  }
  return NextResponse.redirect(client.launchUrl);
}
