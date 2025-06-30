import { SignUpPayload } from "@/types/api.types";
import { NextRequest, NextResponse } from "next/server";
import { authAdmin, firestoreAdmin } from "../../../../../lib/firebase/admin";
import { Timestamp } from "firebase-admin/firestore";

export async function POST(request:NextRequest) {
    try {
        const {email , password , nickname} = await (request.json()) as SignUpPayload;

        const userRecord = await authAdmin.createUser({
            email : email,
            password : password,
        })
        const userCollectionRef =  firestoreAdmin.collection('users');

        await userCollectionRef.doc(userRecord.uid).set({
            email,
            nickname,
            createdAt : Timestamp.now()
        })

        return NextResponse.json({message : '성공적으로 회원가입이 되었습니다'}, {status : 201})
    }catch(error){
        if (error.code === 'auth/email-already-exists') {
            return NextResponse.json(
                { message: '이미 가입된 이메일입니다.' },
                { status: 409 }
            );
        }

        console.error('회원가입 오류:', error);
        return NextResponse.json(
            { message: '서버 오류가 발생했습니다.' },
            { status: 500 }
        );
    }
}