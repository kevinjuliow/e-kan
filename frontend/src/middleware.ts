import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

// next auth automatically protected the routes
export { default } from "next-auth/middleware"

const protectedRoutes = ['/api/:path*', '/cart', '/profile', '/product/add', '/checkout']

// this will apply to all routes by default
export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Check every protected route
  if (protectedRoutes.some(route => req.nextUrl.pathname.startsWith(route))) {
    if (!token) {
      return NextResponse.redirect(new URL('/auth/login', req.url))
    }
    if (!token || token.userType !== 'PENJUAL' && req.nextUrl.pathname === '/product/add') {
      return NextResponse.rewrite(new URL('/error/unauthorized', req.url));
    }
  }

  return NextResponse.next();
}