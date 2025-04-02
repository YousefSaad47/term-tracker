import { NextRequest, NextResponse } from 'next/server';
import { authRoutes, adminRoutesPrefix } from '@/routes';
import { verifyJWT } from '@/lib/auth';
import { ratelimit } from '@/lib/rate-limit';

const isServerAction = (request: NextRequest) => {
  return (
    request.method === 'POST' &&
    request.headers.get('Content-Type')?.includes('multipart/form-data') &&
    request.headers.get('Next-Action')
  );
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('access_token')?.value;

  if (request.headers.has('x-middleware-subrequest')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (isServerAction(request)) {
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown';
    const { success, reset } = await ratelimit.limit(`sa_${ip}`);

    if (!success) {
      return NextResponse.json(
        { error: 'Too Many Requests' },
        {
          status: 429,
          headers: {
            'X-Rate-Limited': 'true',
            'Retry-After': `${Math.ceil((reset - Date.now()) / 1000)}`,
          },
        }
      );
    }
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
