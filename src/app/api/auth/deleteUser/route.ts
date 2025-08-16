import { NextResponse } from "next/server";
import { authAdmin, firestoreAdmin } from "../../../../../lib/firebase/admin";
import { authenticate } from "../../../../../lib/firebase/auth-middleware";
import { ErrorType } from "@/types/api.types";

export async function DELETE() {
    try {
        const decodedToken = await authenticate();
        const uid = decodedToken.uid;

        const userDocRef = firestoreAdmin.collection('users').doc(uid);
        const userRunCounterDoc = firestoreAdmin.collection('userRunCounter').doc(uid);
        const runsDocs = await firestoreAdmin.collectionGroup('runs').where('uid', '==' , uid).get();
        const deletePromiseRunsDoc = [];
        
        runsDocs.forEach(runDoc => deletePromiseRunsDoc.push(firestoreAdmin.recursiveDelete(runDoc.ref)));

        const result = await Promise.allSettled(deletePromiseRunsDoc);
        const failedResult = result.filter((doc) => doc.status === 'rejected');

        if(failedResult.length > 0) {
            return NextResponse.json({ message : '회원 탈퇴 중 오류가 발생했습니다.', status :500 })
            //삭제 실패가 존재하면    
        }
        await userRunCounterDoc.delete();// runcounts 삭제
        await userDocRef.delete(); // userDoc 삭제
        
        await authAdmin.deleteUser(uid); //auth 에서 삭제
      
        return NextResponse.json({message :'성공적으로 회원 탈퇴를 했습니다.', status : 204})

    }catch (error) {
        const err = error as ErrorType;
        // 인증 오류인 경우 401 Unauthorized 응답을 반환합니다.
        if (err.cause === 'AuthenticationError') {
            return NextResponse.json(
                { message: err.message, code: err.code },
                { status: 401 }
            );
        }

        return NextResponse.json(
            { message: '서버 오류가 발생했습니다. 다시 시도해 주세요.', code: 'SERVER_ERROR' },
            { status: 500 }
        );
    }
}