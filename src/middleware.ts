import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  //public paths should be restricted while user is signed in
  const isPublicPath = path === '/login' || path === '/signup';

  const sessionToken = request.cookies.get('token')?.value || '';

  if (isPublicPath && sessionToken) {
    return NextResponse.redirect(new URL('/dashboard', request.nextUrl));
  }
  if (!isPublicPath && !sessionToken) {
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/', '/login', '/signup', '/dashboard', '/dashboard/:path*'],
};
