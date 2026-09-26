import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";
import { getEncodedSecret } from "./lib/token";


const PUBLIC_ROUTES = ["/login"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isPublic = PUBLIC_ROUTES.includes(pathname)
  const token = new TextEncoder().encode(request.cookies.get("token")?.value);
  try {
    await jwtVerify(token, getEncodedSecret())
    if (isPublic) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } catch (error) {
      if (!isPublic) {
        return NextResponse.redirect(new URL("/login", request.url));
      }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|api).*)"],
};
