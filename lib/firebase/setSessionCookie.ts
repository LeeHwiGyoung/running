import { cookies } from "next/headers";
import { authAdmin } from "./admin";

export async function setSessionCookie(idToken: string, expiresIn: number) {
    const sessionCookie = await authAdmin.createSessionCookie(idToken, { expiresIn });
    const cookieStore = await cookies();
    // Next.js `cookies()` 함수를 사용하여 쿠키 설정
     cookieStore.set('session', sessionCookie, {
        maxAge: expiresIn / 1000,
        httpOnly: true, // JavaScript 접근 불가
        secure: process.env.NODE_ENV === 'production', // HTTPS에서만 전송
        sameSite: 'strict',
        path: '/', // 모든 경로에서 쿠키 접근 가능
    });
}