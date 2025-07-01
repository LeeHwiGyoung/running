import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { authAdmin, firestoreAdmin } from "../../../../../lib/firebase/admin";

export async function Delete() {
    try {
        const cookie = await cookies();
        const idToken = cookie?.get('session')?.value;

        const verifyIdToken = await authAdmin.verifySessionCookie(idToken, true);

        const uid = verifyIdToken.uid;

        const userDocRef = firestoreAdmin.collection('users').doc(uid);
        const userRunCounterDoc = firestoreAdmin.collection('userRunCounter').doc(uid);
        const runsDocs = await firestoreAdmin.collectionGroup('runs').where('uid', '==' , uid).get();
        const deletePromiseRunsDoc = [];
        
        runsDocs.forEach(runDoc => deletePromiseRunsDoc.push(firestoreAdmin.recursiveDelete(runDoc.ref)));

        const result = await Promise.allSettled(deletePromiseRunsDoc);
        const failedResult = result.map((doc) => doc.status === 'rejected');

        if(failedResult.length > 0) {
            return NextResponse.json({ message : '회원 탈퇴 중 오류가 발생했습니다.', status :500 })
            //삭제 실패가 존재하면    
        }
        await userRunCounterDoc.delete();// runcounts 삭제
        await userDocRef.delete(); // userDoc 삭제
        
        await authAdmin.deleteUser(uid); //auth 에서 삭제
      
        return NextResponse.json({message :'성공적으로 회원 탈퇴를 했습니다.', status : 204})

    }catch (error) {
        console.log(error);
        return NextResponse.json(`server Error ${error}`)
    }
}