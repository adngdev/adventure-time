import { NextRequest, NextResponse } from "next/server";

const PUBLIC_ROUTES = ["/login"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;
  const isPublic = PUBLIC_ROUTES.includes(pathname);

  if (!token && !isPublic) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token && isPublic) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|api).*)"],
};
