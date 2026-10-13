import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const ADMIN_HOST = 'admin.vinishpurohit.in';
const SITE_HOSTS = new Set(['vinishpurohit.in', 'www.vinishpurohit.in']);

export function middleware(request: NextRequest) {
  const host = request.headers.get('host')?.split(':')[0]?.toLowerCase() || '';
  const { pathname } = request.nextUrl;

  if (host === ADMIN_HOST) {
    if (
      pathname.startsWith('/_next') ||
      pathname.startsWith('/images') ||
      pathname.startsWith('/api') ||
      pathname === '/admin' ||
      pathname.startsWith('/admin/')
    ) {
      return NextResponse.next();
    }

    const url = request.nextUrl.clone();
    url.pathname = pathname === '/' ? '/admin' : `/admin${pathname}`;
    return NextResponse.rewrite(url);
  }

  if (SITE_HOSTS.has(host) && (pathname === '/admin' || pathname.startsWith('/admin/'))) {
    const url = request.nextUrl.clone();
    url.protocol = 'https:';
    url.hostname = ADMIN_HOST;
    url.port = '';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|images/).*)'],
};
