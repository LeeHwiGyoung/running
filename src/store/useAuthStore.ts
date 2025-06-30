'use client';
import { User } from '@/types/user.types';
import { create } from 'zustand';
interface AuthState {
 user : User;
}

interface AuthActions {
 setUser : (value : User) => void; 
}

export const useAuthStore =  create<AuthState & AuthActions>((set) => ({
    user :{ nickname : "" , email : ""},
    setUser : (value) => set({
        user : {
            nickname : value.nickname,
            email : value.email
        }
    })
}))