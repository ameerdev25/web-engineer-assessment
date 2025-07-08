import { generateMfaCode } from "@/lib/mfa";
import { mfaStore, secureWordStore } from "@/lib/store";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { username, code } = await req.json();

  if (!username || !code) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const entry = mfaStore.get(username);

  if (!entry) {
    return NextResponse.json({ error: "No MFA record found" }, { status: 400 });
  }

  if (entry.attempts >= 3) {
    return NextResponse.json({ error: "Too many attempts" }, { status: 403 });
  }

  const expectedCode = entry.code;
  if (code === expectedCode) {
    mfaStore.delete(username);
    secureWordStore.delete(username);
    return NextResponse.json({ success: true });
  }

  entry.attempts += 1;
  mfaStore.set(username, entry);

  return NextResponse.json({ error: "Invalid code" }, { status: 401 });
}
