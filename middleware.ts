import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const session = request.cookies.get("session");
  const { pathname } = request.nextUrl;

  const isProtectedPath =
    pathname.startsWith("/dashboard") || pathname.startsWith("/grade");

  if (isProtectedPath) {
    if (!session) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    if (pathname.startsWith("/dashboard")) {
      try {
        const user = JSON.parse(session.value);

        if (
          pathname.startsWith("/dashboard/admin") &&
          user.role !== "admin"
        ) {
          return NextResponse.redirect(
            new URL("/dashboard/student", request.url)
          );
        }

        if (
          pathname.startsWith("/dashboard/doctor") &&
          user.role !== "professor"
        ) {
          return NextResponse.redirect(
            new URL("/dashboard/student", request.url)
          );
        }
      } catch (e) {
        return NextResponse.redirect(new URL("/login", request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/grade/:path*"],
};
