import { cookies } from "next/headers";
import { authAdmin } from "./admin";
import { ErrorType } from "@/types/api.types";

export const authenticate = async() => {
    try{
        const cookieStore = await cookies();
        const sessionCookie = cookieStore.get('session');
        
        const idToken = sessionCookie?.value;
        
        if(!idToken) {
            const error = new Error('인증 되지 않은 사용자입니다.') as ErrorType;
            error.cause = "AuthenticationError";
            error.code = "AUTH/NO_TOKEN"
            throw error;
        }

        const decodedToken = await authAdmin.verifySessionCookie(idToken, true);
        
        return decodedToken;
    }catch(error : unknown) {
        if(error instanceof Error) {
            const firebaseError = error as ErrorType;
            switch(firebaseError.code) {
                case 'auth/session-cookie-expired' :
                    const expiredError = new Error('세션이 만료되었습니다. 다시 로그인해주세요.') as ErrorType;
                    expiredError.cause = "AuthenticationError";
                    expiredError.code = "AUTH/SESSION_EXPIRED";
                    throw expiredError;
                case 'auth/argument-error':
                case 'auth/invalid-argument':
                case 'auth/invalid-credential':
                case 'auth/session-cookie-revoked': // 토큰이 취소된 경우
                    const invalidTokenError = new Error('유효하지 않은 토큰입니다. 다시 로그인해주세요.') as ErrorType;
                    invalidTokenError.cause = "AuthenticationError";
                    invalidTokenError.code = "AUTH/INVALID_TOKEN";
                    throw invalidTokenError;
                default:
                    const unknownError = new Error('알 수 없는 인증 오류가 발생했습니다.') as ErrorType;
                    unknownError.cause = "AuthenticationError";
                    unknownError.code = firebaseError.code || "AUTH/UNKNOWN_ERROR";
                    throw unknownError;
            }
        }

        const unexpectedError = new Error('예상치 못한 서버 오류가 발생했습니다.') as ErrorType;
        unexpectedError.cause = "BadRequest"; // 또는 "ServerError"
        unexpectedError.code = "UNKNOWN";
        throw unexpectedError;
    }
}