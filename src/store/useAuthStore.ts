'use client';
import { User } from '@/types/user.types';
import { create } from 'zustand';
interface AuthState {
 user : User;
 isLoggedIn : boolean;
}

interface AuthActions {
 setUser : (value : User) => void;
 setIsLoggedIn  : (value : boolean) => void;
 clearUser : () => void;
}

export const useAuthStore =  create<AuthState & AuthActions>((set) => ({
    user :{ nickname : "" , email : "" },
    isLoggedIn : false,
    setUser : (value) => set({
        user : {
            nickname : value.nickname,
            email : value.email,
        }
    }),
    setIsLoggedIn : (value) => set({isLoggedIn : value}),
    
    clearUser : () => set({
        user : {nickname : "" , email : ""}
    })
}))