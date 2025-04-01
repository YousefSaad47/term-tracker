import { NextRequest, NextResponse } from 'next/server';
import { authRoutes, adminRoutesPrefix } from '@/routes';
import { verifyJWT } from '@/lib/auth';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('access_token')?.value;

  if (request.headers.has('x-middleware-subrequest')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const isAdminRoute = pathname.startsWith(adminRoutesPrefix);
  const isAuthRoute = authRoutes.includes(pathname);

  if (isAdminRoute && !token) {
    return NextResponse.redirect(new URL('/signin', request.url));
  }

  let payload;
  if (token) {
    payload = await verifyJWT(token);
  }

  if (isAdminRoute && (!payload || payload.role !== 'ADMIN')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
