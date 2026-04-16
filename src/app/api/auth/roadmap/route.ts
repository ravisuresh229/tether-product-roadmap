import { timingSafeEqual } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { signRoadmapSession } from "@/lib/roadmap-cookie";

const COOKIE_NAME = "roadmap_auth";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

function safeRedirectPath(from: string | null): string {
  if (!from || !from.startsWith("/") || from.startsWith("//")) return "/";
  return from;
}

export async function POST(request: NextRequest) {
  const secret = process.env.ROADMAP_PASSWORD;
  if (!secret) {
    return new NextResponse("Server misconfigured", { status: 500 });
  }

  let password = "";
  let from = "/";
  const contentType = request.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    const body = (await request.json()) as { password?: string; from?: string };
    password = typeof body.password === "string" ? body.password : "";
    from = safeRedirectPath(
      typeof body.from === "string" ? body.from : null
    );
  } else {
    const form = await request.formData();
    password = typeof form.get("password") === "string" ? String(form.get("password")) : "";
    from = safeRedirectPath(
      typeof form.get("from") === "string" ? String(form.get("from")) : null
    );
  }

  const a = Buffer.from(password, "utf8");
  const b = Buffer.from(secret, "utf8");
  const ok =
    a.length === b.length && timingSafeEqual(a, b);

   if (!ok) {
    const url = request.nextUrl.clone();
    url.pathname = "/gate";
    url.search = "";
    url.searchParams.set("error", "1");
    url.searchParams.set("from", from);
    // 303: after POST, follow-up must be GET (307 would re-POST and break `/`).
    return NextResponse.redirect(url, 303);
  }

  const token = await signRoadmapSession(secret);
  const destination = new URL(from, request.nextUrl.origin);
  if (destination.origin !== request.nextUrl.origin) {
    destination.pathname = "/";
    destination.search = "";
  }
  const res = NextResponse.redirect(destination, 303);
  res.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: COOKIE_MAX_AGE,
    path: "/",
  });
  return res;
}
