import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { authAdmin } from "../../../../../lib/firebase/admin";

export async function POST(request : NextRequest) {
    let response;
    try {
        const body =  await request.json();
        const logoutType = body.logoutType;
    
        const cookie = await cookies();
        const idToken = cookie?.get('session').value;
    
        const verifyIdToken = await authAdmin.verifySessionCookie(idToken, true);

        //리프레쉬 토큰 무효화
        if(logoutType === 'all-device' ) {
            await authAdmin.revokeRefreshTokens(verifyIdToken.sub);
        }

        response = NextResponse.json({message : '로그아웃이 성공적으로 되었습니다.' , status : 200})
       
    }catch(error){
        console.error(error);
        response =  NextResponse.json({ message : `로그아웃이 되었습니다.`, status : 200})
    }finally {
        (await cookies()).set('session' , '' , {
            maxAge : 0,
            expires : new Date(0),
            httpOnly : true,
            secure : process.env.NODE_ENV === 'production',
            path : '/' 
        });    
        return  response;
    }
}