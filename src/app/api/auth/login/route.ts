import { NextRequest, NextResponse } from "next/server";
import { ErrorType } from "@/types/api.types";
import { setSessionCookie } from "../../../../../lib/firebase/setSessionCookie";
import { authAdmin } from "../../../../../lib/firebase/admin";

export async function POST(request: NextRequest) {
    try {
        const authorization = request.headers.get('authorization');
        
        if(!authorization || !authorization.startsWith('Bearer ')) {
            const error = new Error as ErrorType;
            error.cause = "BadRequest";
            error.code = "login/header-error";
            throw error;
        }

        const idToken = authorization.split('Bearer')[1].trim();
        
        if (!idToken) {
            const error = new Error as ErrorType;
            error.cause = "BadRequest";
            error.code = "login/argument-error";
            throw error;        
        }       


        const decodedToken = await authAdmin.verifyIdToken(idToken);
        const nickname = decodedToken.name;
        const expiresIn = 60 * 60 * 1000; // 1시간
     
        await setSessionCookie(idToken, expiresIn);

        return NextResponse.json({ message: '로그인 성공'  , nickname : nickname}, { status: 200 });

    } catch (error) {
        const err = error as ErrorType;

        // Firebase ID 토큰 검증 오류 처리
        if (err.code === 'auth/id-token-expired' || err.code === 'auth/invalid-id-token' || err.code === 'auth/argument-error') {
            return NextResponse.json({ message: '로그인 세션이 만료되었거나 유효하지 않습니다.', code: err.code }, { status: 401 });
        }
        
        // 커스텀 에러 처리
        if (err.cause === 'BadRequest') {
            return NextResponse.json({ message: err.message, code: err.code }, { status: 400 });
        }
        
        //이외의 서버 에러
        return NextResponse.json({ message: '서버 오류가 발생했습니다.', code: 'SERVER_ERROR' }, { status: 500 });
    }
}