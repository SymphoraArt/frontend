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
