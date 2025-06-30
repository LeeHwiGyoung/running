'use client';

import { useAuthStore } from "@/store/useAuthStore";
import { SignUpPayload } from "@/types/api.types";
import { useState } from "react";

export const useSignup = () => {
    const [isLoading , setIsLoading] = useState<boolean>(false);
    const [error , setError ] = useState<string | null>(null);

    const setUser = useAuthStore(state => state.setUser);
    
    const signup = async({email , password , nickname} : SignUpPayload) => {
        try{
            setIsLoading(true);
            setError(null);
            const response = await fetch('api/user/signup' , {
                method : 'POST',
                headers : {
                    'Content-type' : 'application/json'
                },
                body : JSON.stringify({email, password, nickname}) 
            })

            if(response.ok) {
                const data = await response.json();
                setUser({email , nickname});
                console.log(data.message);
            }else {
                const errorData = await response.json();
                // 백엔드에서 보낸 에러 메시지를 상태에 저장
                setError(errorData.message || '알 수 없는 오류가 발생했습니다.');
                console.error('회원가입 실패 (응답 오류):', errorData.message);
            } 
        }catch(error){
            console.error('회원 가입에 실패했습니다.', error.message)
        }finally{
            setIsLoading(false);
        }
    }

    return {isLoading, error ,signup}
}