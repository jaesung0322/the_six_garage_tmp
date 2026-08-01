import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  ADMIN_BASE_PATH,
  ADMIN_FORGOT_PATH,
  ADMIN_LOGIN_PATH,
  SESSION_COOKIE,
} from "@/lib/admin/config";
import { verifyToken } from "@/lib/admin/token";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isPublicAuth =
    pathname === ADMIN_LOGIN_PATH || pathname === ADMIN_FORGOT_PATH;
  const session = verifyToken(request.cookies.get(SESSION_COOKIE)?.value);

  if (!session && !isPublicAuth) {
    const url = request.nextUrl.clone();
    url.pathname = ADMIN_LOGIN_PATH;
    return NextResponse.redirect(url);
  }

  if (session && isPublicAuth) {
    const url = request.nextUrl.clone();
    url.pathname = ADMIN_BASE_PATH;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/six_garage_mgt", "/six_garage_mgt/:path*"],
};
