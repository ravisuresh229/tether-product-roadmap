const COOKIE_MAX_MS = 7 * 24 * 60 * 60 * 1000;

async function hmacKeyMaterial(password: string): Promise<ArrayBuffer> {
  const enc = new TextEncoder();
  return crypto.subtle.digest(
    "SHA-256",
    enc.encode(`roadmap-gate:${password}`)
  );
}

async function hmacHex(secret: string, message: string): Promise<string> {
  const enc = new TextEncoder();
  const raw = await hmacKeyMaterial(secret);
  const key = await crypto.subtle.importKey(
    "raw",
    raw,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(message));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function timingSafeEqualHex(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let out = 0;
  for (let i = 0; i < a.length; i++) {
    out |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return out === 0;
}

export async function signRoadmapSession(password: string): Promise<string> {
  const exp = Date.now() + COOKIE_MAX_MS;
  const payload = String(exp);
  const sig = await hmacHex(password, payload);
  return `${payload}.${sig}`;
}

export async function verifyRoadmapSession(
  token: string | undefined,
  password: string
): Promise<boolean> {
  if (!token) return false;
  const dot = token.indexOf(".");
  if (dot === -1) return false;
  const expStr = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  const exp = Number(expStr);
  if (!Number.isFinite(exp) || Date.now() > exp) return false;
  const expected = await hmacHex(password, expStr);
  return timingSafeEqualHex(sig, expected);
}
