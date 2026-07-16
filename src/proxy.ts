import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  // Only protect /admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Check for our custom auth cookie
    const hasAuthCookie = request.cookies.has('ira_admin_auth');
    
    if (!hasAuthCookie) {
      // Redirect to login page if not authenticated
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/admin'],
};
