import { NextRequest, NextResponse } from "next/server";
import { firestoreAdmin } from "../../../../../lib/firebase/admin";
import { authenticate } from "../../../../../lib/firebase/auth-middleware";

export async function GET(req : NextRequest) { // req 인자를 받아 쿼리 파라미터에 접근
    try {
        const decodedToken = await authenticate();
        const uid = decodedToken.uid;

        const lastDocId = req.nextUrl.searchParams.get('lastDocId'); // 클라이언트에서 전달받을 페이지네이션 커서

        const runDocsRef = firestoreAdmin.collection('runs');
        
        let query = runDocsRef.where('uid' , '==' , uid ).orderBy('createdAt' , 'desc').limit(1);
        
        // lastCreatedAt과 lastDocId가 존재하면, 해당 시점부터 다음 5개를 가져옴
        if (lastDocId) {
            // Timestamp 타입으로 변환 (문자열로 넘어올 경우)
            query = query.startAfter(lastDocId);
        }

        const snapshot = await query.get();

        if (snapshot.empty) {
            console.log('달리기 기록이 없습니다.');
            return NextResponse.json({runs : [] , nextCursor : null , status : 200} )
        }

        const runs = [];
        snapshot.forEach(doc => {
            runs.push({ id: doc.id, ...doc.data() });
        });

        // 다음 페이지를 위한 커서 정보 생성
        const lastVisibleDoc = snapshot.docs[snapshot.docs.length - 1];
        const nextCursor = {
            lastDocId: lastVisibleDoc.id,
        };

        return NextResponse.json({runs, nextCursor , status : 200} )
    } catch (error) {
        console.error('런 기록 조회 중 오류 발생:', error);
        return NextResponse.json({error :  error.message || '서버 오류가 발생했습니다' , status : 500} )}       
}