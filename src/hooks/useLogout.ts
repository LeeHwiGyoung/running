'use client';

import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function useLogout() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error , setError] = useState<string | null>(null);
  const clearUser = useAuthStore((state) => state.clearUser);
  const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn)
  const router = useRouter();

  const logout = async(logoutType : boolean = false) => {
    const isAllDeviceLogout = logoutType ? 'all-device' : '';
    try{
        const res = await fetch('api/auth/logout' , {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({logoutType : isAllDeviceLogout})
        })
        
        if(!res.ok){
            console.error('네트워크 에러 : 로그아웃에 실패했습니다.' )
            return;
        }

        const result = await res.json();
        clearUser();
        setIsLoggedIn(false);
        router.push('/')
        console.log('로그아웃 성공:', result.message);
    }
    catch(error){
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(`errorCode : ${errorCode}: ${errorMessage}`);
    }finally{
        setIsLoading(false);
    }
  }

  return {logout , error , isLoading}
}
