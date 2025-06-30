import { NextRequest, NextResponse } from "next/server";
import { authAdmin } from "../../../../../lib/firebase/admin";
import { cookies} from "next/headers";

export async function POST(request: NextRequest) {
    try {
        const authorization = request.headers.get('authorization');
        if(!authorization || !authorization.startsWith('Bearer ')) {
            return NextResponse.json({ message: 'Authorization 헤더가 누락되었거나 유효하지 않습니다.' },{ status: 401 });
        }
        const idToken = authorization.split('Bearer')[1].trim();
        if (!idToken) {
            return NextResponse.json({ message: 'ID 토큰이 필요합니다.' }, { status: 400 });
        }       
        const decodedToken = await authAdmin.verifyIdToken(idToken);
        const nickname = decodedToken.name;
        const expiresIn = 60 * 60 * 1000; // 1시간
        const sessionCookie = await authAdmin.createSessionCookie(idToken, { expiresIn });
        // 3. 세션 쿠키를 응답 헤더에 설정하여 클라이언트에게 보냅니다.
        // Next.js App Router에서는 `cookies()` 함수를 사용합니다.
        (await cookies()).set('session' , sessionCookie , {
            maxAge: expiresIn,
            httpOnly: true, // JavaScript로 접근 불가 (XSS 공격 방지)
            secure: process.env.NODE_ENV === 'production', // HTTPS에서만 전송 (운영 환경)
            sameSite: 'strict',
            path: '/', // 모든 경로에서 쿠키 접근 가능
        })

        return NextResponse.json({ message: '로그인 성공'  , nickname : nickname}, { status: 200 });

    } catch (error) {
        console.error('로그인 API 오류:', error);
        // 토큰 검증 실패 시 오류 처리
        if (error.code === 'auth/id-token-expired' || error.code === 'auth/invalid-id-token') {
            return NextResponse.json({ message: '로그인 세션이 만료되었거나 유효하지 않습니다.' }, { status: 401 });
        }
        return NextResponse.json({ message: '서버 오류가 발생했습니다.' }, { status: 500 });
    }
}