import { NextRequest, NextResponse } from "next/server";
import { setSessionCookie } from "../../../../../lib/firebase/setSessionCookie";

export async function POST(request : NextRequest) {
try {
    const { idToken } = await request.json();
    // 새 ID 토큰으로 세션 쿠키 갱신
    const expiresIn = 60 * 60 *1000; // 1시간
    setSessionCookie(idToken , expiresIn);
    
    return NextResponse.json({ status: 'session refreshed' }, {
      status: 200, 
    });

  } catch (error) {
    console.error('세션 갱신 실패:', error);
    return NextResponse.json({ message: '세션 갱신 실패' }, { status: 401 });
  }
}