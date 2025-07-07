import { NextRequest, NextResponse } from "next/server";

type SecureWordEntry = {
  username: string;
  secureWord: string;
  issuedAt: number;
  lastRequestedAt: number;
};

type MfaEntry = {
  code: string;
  attempts: number;
};

const secureWordStore = new Map<string, SecureWordEntry>();
const mfaStore = new Map<string, MfaEntry>();

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

  // Simulate password check: accept any hash
  const mfaCode = Math.floor(100000 + Math.random() * 900000).toString();

  mfaStore.set(username, { code: mfaCode, attempts: 0 });

  return NextResponse.json({ success: true, message: "Proceed to MFA" });
}
