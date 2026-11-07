import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Middleware for the Paper Tree login system.
 *
 * Rules enforced here (UX redirects):
 *   - Unauthenticated users cannot reach /dashboard/* → sent to /login
 *   - Already-logged-in users hitting /login → sent to their institute dashboard
 *
 * The real security boundary (institute-scope enforcement) lives in the
 * dashboard page, which verifies the signed session via getServerSession()
 * and refuses to render another institute's data.
 */
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const sessionToken = req.cookies.get("next-auth.session-token")?.value;
  const isLoggedIn = Boolean(sessionToken);

  // Public routes
  if (
    pathname === "/login" ||
    pathname === "/" ||
    pathname.startsWith("/api/auth")
  ) {
    if (isLoggedIn && pathname === "/login") {
      const url = req.nextUrl.clone();
      url.pathname = "/dashboard";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // Protected: everything under /dashboard
  if (pathname.startsWith("/dashboard")) {
    if (!isLoggedIn) {
      const url = req.nextUrl.clone();
      url.pathname = "/login";
      url.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*))"],
};