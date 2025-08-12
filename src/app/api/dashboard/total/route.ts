import { NextRequest, NextResponse } from "next/server";
import { authenticate } from "../../../../../lib/firebase/auth-middleware";
import { firestoreAdmin } from "../../../../../lib/firebase/admin";
import { getWeekRange } from "@/utils/getToday";

export async function GET(request : NextRequest){
    try {
        const decodedToken = await authenticate()
        const { searchParams } =  new URL(request.nextUrl);
        const weekParam = searchParams.get("week") || "current"; // 기본값 current// 주간 범위 계산
        const baseDate = new Date();
        if (weekParam === "prev") {
            baseDate.setDate(baseDate.getDate() - 7); // 1주 전 날짜
        }

        const { startOfWeek, endOfWeek } = getWeekRange(baseDate.toISOString());
        const uid = decodedToken.uid;
        const runDocsRef = firestoreAdmin.collection('runs');
        const query = runDocsRef.where('uid', '==', uid).where('createdAt' , ">=" , startOfWeek).where('createdAt', "<=" , endOfWeek);
        console.log(endOfWeek , startOfWeek, 'querys')
        const snapShot = await query.get();

        if(snapShot.empty) {
            console.log('주간 달리기 기록이 없습니다.')
            return NextResponse.json({total : [] ,status : 200});
        }
        const total = snapShot.docs.map(doc => ({id : doc.id , ...doc.data()}))
        return NextResponse.json({total , status : 200})
    }catch(error) {
        console.error('주간 달리기 기록 조회 중 오류 발생', error);
        return NextResponse.json({error : error.message || '서버 오류가 발생했습니다' , status : 500});
    }
}