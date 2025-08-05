import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get('session');
  const pathname = request.nextUrl.pathname;

  if (pathname === '/login' || pathname === '/signup') {
    return NextResponse.next();
  }

  const isLoggedIn = !!sessionCookie;

  if (!isLoggedIn) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = '/login';
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * 다음을 제외한 모든 요청 경로와 일치:
     * - api/auth (인증 API)
     * - _next/static (정적 파일)
     * - _next/image (이미지 최적화 파일)
     * - favicon.ico (파비콘)
     * - public 폴더 내 파일들 (예: .svg, .png 등)
     */
    '/((?!api|auth|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
