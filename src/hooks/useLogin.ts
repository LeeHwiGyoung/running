'use client';

import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { auth } from "../../lib/firebase/client";
import { signInWithEmailAndPassword } from "firebase/auth";
interface useLoginProps {
    redirectUrl : string;
}
export const useLogin = ({redirectUrl} : useLoginProps) => {
    const [isLoading , setIsLoading] = useState<boolean>(false);
    const [error ,setError] = useState<string | null> (null);

    const setUser = useAuthStore(state => state.setUser);
    const setIsLoggedIn = useAuthStore(state => state.setIsLoggedIn);
    const router = useRouter();

    const clientAuth = auth;

    const login = async({email , password}) => {
        setIsLoading(true);
        try{
            const userCredential =  await signInWithEmailAndPassword(clientAuth , email , password);
            const user = userCredential.user;
            const userIdToken = await user.getIdToken();

            const response = await fetch('api/auth/login', {
                method : 'POST',
                headers : {
                    'Authorization': `Bearer ${userIdToken}`
                },
            })
            if(response.ok){
                const result = await response.json();
                setUser({email , nickname : result.name});
                setIsLoggedIn(true);
                if(redirectUrl == `${process.env.NEXT_PUBLIC_BASE_URL}/login`){
                   router.push('/');   
                 }else {
                     router.push(`${redirectUrl}`);
                 }
                console.log('로그인 성공:', result.message);
            }else {
                const errorData = await response.json(); // 서버에서 보낸 에러 메시지를 파싱
                console.error('세션 생성 실패:', errorData.message);
            }
        }catch(error){
            const errorCode = error.code;
            const errorMessage = error.message;
            setError(`errorCode : ${errorCode}: ${errorMessage}`);
        }finally{
            setIsLoading(false);
        }

    }

    return {login , isLoading , error}

}
