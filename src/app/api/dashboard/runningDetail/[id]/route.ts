import { NextRequest, NextResponse } from 'next/server';
import { authenticate } from '../../../../../../lib/firebase/auth-middleware';
import { firestoreAdmin } from '../../../../../../lib/firebase/admin';

export async function GET(request:NextRequest ,   { params }: { params: Promise<{ id: string }> }) {
    try {
        const decodedToken = await authenticate(); //로그인 인증 및 decodedToken 반환
        const { id }  = await params;
        const uid = decodedToken.uid;

        const runDocsRef = firestoreAdmin.collection('runs').doc(id);

        const runSnapShot = await runDocsRef.get();

        if(!runSnapShot.exists) {
            console.error('달리기 기록이 없습니다.')
            return  NextResponse.json({ runDetail: []  , status : 200})
        }

        if (runSnapShot.data().uid !== uid) {
            return NextResponse.json({ error: 'Unauthorized', status: 403 });
        }

        const runDetailData = runSnapShot.data();

        const pathPointsRef = firestoreAdmin.collection('runs').doc(id).collection('pathpoints');
        const pathPointsSnapShot = await pathPointsRef.get();

        const pathPointChunks = pathPointsSnapShot.docs.map(doc => doc.data());
        pathPointChunks.sort((a, b) => a.chunkId - b.chunkId);

        const totalPathPoints = [];
        
        pathPointChunks.map((chunk) => {
            if(chunk.pathPoints && Array.isArray(chunk.pathPoints)){
                chunk.pathPoints.sort((a, b) => a.timestamp - b.timestamp);
                totalPathPoints.push(...chunk.pathPoints)
            }
        })
    
        return NextResponse.json({runDetail : runDetailData , pathPoints : totalPathPoints , status : 200})
    }
    catch(error){
        console.error('런 기록 조회 중 오류 발생:', error);
        return NextResponse.json({error :  error.message || '서버 오류가 발생했습니다' , status : 500});       
    }
}