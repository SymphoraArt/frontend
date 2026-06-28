import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Single team access code gates the whole app while it is in private development.
// Everyone can see the public marketing landing ("/"), but /home and every other
// page requires the code. The gate is DISABLED automatically when TEAM_ACCESS_CODE
// is not set, so local dev stays open unless you opt in.
//
// Next.js 16 renamed the "middleware" convention to "proxy".
const COOKIE = "enki_team";

function isPublic(pathname: string): boolean {
  // Public marketing landing + the gate flow itself
  if (pathname === "/" || pathname === "/landing.html") return true;
  if (pathname === "/gate") return true;
  if (pathname === "/api/gate") return true;
  // The landing mosaic feed must stay reachable for the public landing
  if (pathname === "/api/header-images") return true;
  // Framework internals + asset folders
  if (
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/header/") ||
    pathname.startsWith("/previews/") ||
    pathname.startsWith("/fonts/")
  ) {
    return true;
  }
  // Any static asset by extension (favicon, logo, css, js, fonts, media…)
  if (/\.(png|jpe?g|webp|gif|svg|ico|css|js|map|txt|woff2?|ttf|otf|mp4|webm|json)$/i.test(pathname)) {
    return true;
  }
  return false;
}

export function proxy(req: NextRequest) {
  const code = process.env.TEAM_ACCESS_CODE;
  // Gate off when no code configured.
  if (!code) return NextResponse.next();

  const { pathname } = req.nextUrl;
  if (isPublic(pathname)) return NextResponse.next();

  const token = req.cookies.get(COOKIE)?.value;
  if (token && token === code) return NextResponse.next();

  // For API calls, answer with 401 instead of an HTML redirect.
  if (pathname.startsWith("/api/")) {
    return new NextResponse(JSON.stringify({ error: "Access code required" }), {
      status: 401,
      headers: { "content-type": "application/json" },
    });
  }

  // Otherwise send the visitor to the gate, remembering where they wanted to go.
  const url = req.nextUrl.clone();
  url.pathname = "/gate";
  url.searchParams.set("next", pathname);
  return NextResponse.redirect(url);
}

export const config = {
  // Run on all routes; asset/internal filtering happens in isPublic().
  matcher: ["/((?!_next/static|_next/image).*)"],
};
