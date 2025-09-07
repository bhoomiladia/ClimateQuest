import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Protect these routes
        if (req.nextUrl.pathname.startsWith('/dashboard') || 
            req.nextUrl.pathname.startsWith('/chatbot') ||
            req.nextUrl.pathname.startsWith('/community') ||
            req.nextUrl.pathname.startsWith('/profile')) {
          return !!token; // true if authenticated
        }
        return true;
      },
    },
  }
);

export const config = {
  matcher: [
    '/mainpage/:path*',
    '/chatbot/:path*',
    '/community/:path*',
    '/profile/:path*',
  ],
};