import { NextResponse } from "next/server";

export function middleware(request) {
    const path = request.nextUrl.pathname;
    const token = request.cookies.get('access_token')?.value || '';
    const isLoggedIn = token !== '';

    if (!isLoggedIn && path === '/') {
        // If the user is not logged in and trying to access the default / route, redirect to /auth/login
        return NextResponse.redirect(new URL('/auth/login', request.nextUrl));
    }

    if (isLoggedIn && path.startsWith('/auth/')) {
        // If the user is not logged in and trying to access the default / route, redirect to /auth/login
        return NextResponse.redirect(new URL('/', request.nextUrl));
    }

    // If the user is logged in or the path doesn't match the criteria, allow the request to continue
    return NextResponse.next();
}

export const config = {
  matcher: ['/', '/auth/:path*'], // Add the paths you want to match
};
