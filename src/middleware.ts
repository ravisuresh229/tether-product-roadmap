import { NextResponse, type NextRequest } from "next/server";
import { verifyRoadmapSession } from "@/lib/roadmap-cookie";

const COOKIE_NAME = "roadmap_auth";

export async function middleware(request: NextRequest) {
  const secret = process.env.ROADMAP_PASSWORD;
  if (!secret) {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;

  if (
    pathname === "/gate" ||
    pathname.startsWith("/api/auth/roadmap")
  ) {
    return NextResponse.next();
  }

  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (await verifyRoadmapSession(token, secret)) {
    return NextResponse.next();
  }

  const gate = request.nextUrl.clone();
  gate.pathname = "/gate";
  gate.search = "";
  gate.searchParams.set(
    "from",
    `${pathname}${request.nextUrl.search}`
  );
  return NextResponse.redirect(gate);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
