// next auth automatically protected the routes
export { default } from "next-auth/middleware"

// next auth automatically protected these routes inside matcher
export const config = {
  // matcher: ['/api/:path*', '/dashboard'],
  matcher: ['/api/:path*', '/cart'],

  // If user wants to buy the fish, user should login
}