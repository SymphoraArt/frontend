import { NextResponse } from "next/server";

// Validates the team access code and, on success, sets the httpOnly cookie the
// middleware checks. The code itself lives only in TEAM_ACCESS_CODE (server env).
export async function POST(req: Request) {
  const code = process.env.TEAM_ACCESS_CODE;
  if (!code) {
    return NextResponse.json({ ok: false, error: "Gate not configured" }, { status: 500 });
  }

  let given = "";
  try {
    const body = await req.json();
    given = (body?.code ?? "").toString();
  } catch {
    /* empty / invalid body → treated as wrong code */
  }

  if (given !== code) {
    return NextResponse.json({ ok: false, error: "Wrong access code" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE, code, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
  return res;
}

const COOKIE = "enki_team";

/**
 * GET → { team: boolean } — whether this browser carries a valid team
 * cookie. The client beta wall asks this to let TEAM-CODE holders browse
 * the UI without a user account (Kev, 2026-08-23: "eig sollte der code ja
 * mich in die ui bringen da ich team member bin"). Grants NOTHING by
 * itself: every user-bound API still requires a real session, and with no
 * code configured the answer is simply false.
 */
export async function GET(req: Request) {
  const code = process.env.TEAM_ACCESS_CODE;
  if (!code) return NextResponse.json({ team: false });
  const cookies = (req.headers.get("cookie") ?? "").split(/;\s*/);
  const team = cookies.some((c) => c === `${COOKIE}=${encodeURIComponent(code)}` || c === `${COOKIE}=${code}`);
  return NextResponse.json({ team });
}
