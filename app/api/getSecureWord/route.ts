import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";

type SecureWordEntry = {
  username: string;
  secureWord: string;
  issuedAt: number;
  lastRequestedAt: number;
};

const secureWordStore = new Map<string, SecureWordEntry>();
const SECRET = "my_secret_key";

export async function POST(req: NextRequest) {
  const { username } = await req.json();

  if (!username) {
    return NextResponse.json({ error: "Username required" }, { status: 400 });
  }

  const now = Date.now();
  const existing = secureWordStore.get(username);

  if (existing && now - existing.lastRequestedAt < 10_000) {
    return NextResponse.json(
      { error: "Wait 10 seconds between requests" },
      { status: 429 }
    );
  }

  const secureWord = crypto
    .createHmac("sha256", SECRET)
    .update(username + now)
    .digest("hex");

  secureWordStore.set(username, {
    username,
    secureWord,
    issuedAt: now,
    lastRequestedAt: now,
  });

  return NextResponse.json({ secureWord });
}
