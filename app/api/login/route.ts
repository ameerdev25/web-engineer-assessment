import { generateMfaCode, generateSecret } from "@/lib/mfa";
import { mfaStore, secureWordStore } from "@/lib/store";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { username, hashedPassword, secureWord } = await req.json();

  if (!username || !hashedPassword || !secureWord) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const entry = secureWordStore.get(username);

  if (!entry || entry.secureWord !== secureWord) {
    return NextResponse.json({ error: "Invalid secure word" }, { status: 401 });
  }

  if (Date.now() - entry.issuedAt > 60_000) {
    return NextResponse.json({ error: "Secure word expired" }, { status: 403 });
  }

  const secret = generateSecret(username);

  const mfaCode = generateMfaCode(secret);
  mfaStore.set(username, { code: mfaCode, attempts: 0 });
  console.log(`[MFA CODE] for ${username}: ${mfaCode}`);

  return NextResponse.json({ success: true, message: "Proceed to MFA" });
}
