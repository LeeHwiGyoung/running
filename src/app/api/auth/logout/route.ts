import { authenticate } from './../../../../../lib/firebase/auth-middleware';
import { NextRequest, NextResponse } from "next/server";
import { authAdmin } from "../../../../../lib/firebase/admin";
import { ErrorType } from '@/types/api.types';
import { cookies } from 'next/headers';

export async function POST(request : NextRequest) {
    let response;
    try {
        const {logoutType} =  await request.json();    
        const verifyIdToken = await authenticate();

        //리프레쉬 토큰 무효화
        if(logoutType === 'all-device' ) {
            await authAdmin.revokeRefreshTokens(verifyIdToken.sub);
        }

        response = NextResponse.json({message : '로그아웃이 성공적으로 되었습니다.' , status : 200})
       
    }catch(error){
        const err = error as ErrorType;
        if(err.cause === 'AuthenticationError') { //이미 토큰이 만료되어서
            response = NextResponse.json({ message : `로그아웃이 되었습니다.`, status : 200})      
        }else{
            response = NextResponse.json({message : 'server Errror' , status : 500});
        }
        
    }finally {
        (await cookies()).delete('session');
        //세션 쿠키 무효화
        return  response;
    }
}