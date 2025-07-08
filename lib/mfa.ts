import crypto from "crypto";

export function generateSecret(username: string): string {
  return crypto
    .createHash("sha256")
    .update(username + Date.now())
    .digest("hex");
}

export function generateMfaCode(secret: string, window: number = 30): string {
  const timeWindow = Math.floor(Date.now() / 1000 / window);
  const hmac = crypto
    .createHmac("sha1", secret)
    .update(String(timeWindow))
    .digest();
  const offset = hmac[hmac.length - 1] & 0xf;
  const code = (hmac.readUInt32BE(offset) & 0x7fffffff) % 1000000;
  return code.toString().padStart(6, "0");
}
