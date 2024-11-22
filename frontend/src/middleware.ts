import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

// next auth automatically protected the routes
export { default } from "next-auth/middleware"

// this will apply to all routes by default
export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (req.nextUrl.pathname === '/product/add') {
    if (!token) {
      return NextResponse.redirect(new URL('/auth/login', req.url))
    }
    if (!token || token.userType !== 'PENJUAL') {
      return NextResponse.rewrite(new URL('/error/unauthorized', req.url));
    }
  }

  return NextResponse.next();
}

// next auth automatically protected these routes inside matcher
export const config = {
  // matcher: ['/api/:path*', '/dashboard'],
  matcher: ['/api/:path*', '/cart', '/product/add'],

  // If user wants to buy the fish, user should login
}