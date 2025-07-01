import { SaveRunningResultRequestBody } from "@/types/api.types";
import { NextRequest, NextResponse } from "next/server";
import { authAdmin, firestoreAdmin } from "../../../../lib/firebase/admin";
import { cookies } from "next/headers";
import { FieldValue, Timestamp } from "firebase-admin/firestore";

export async function POST (request : NextRequest) {
    try{
        const sessionCookies = (await cookies()).get('session');
        const idToken = sessionCookies.value;
        
        const decodedToken = await authAdmin.verifyIdToken(idToken);
        const uid = decodedToken.uid;

        const body = (await request.json()) as SaveRunningResultRequestBody;

        const {runData , pathPoints } = body;
        const {runTitle , date , startTime , endTime ,totalDistance, totalRunningTimeSecond , avgPace , centerMapLat, centerMapLng , dayOfWeek} = runData;

        const userRunCountRef = firestoreAdmin.collection('userRunCounter').doc(uid);
        const runsDocRef = firestoreAdmin.collection('runs')

        //여기서 runCouterRef로 runcount 갖고오기
        const runCountDoc = await userRunCountRef.get();
        const userRunCount = runCountDoc.data().runCount || 0;
        const updateRunCount = userRunCount + 1;
        //여기서 runDoc 생성
        await runsDocRef.add(({
            runTitle, 
            avgPace,
            date,
            dayOfWeek,
            endTime,
            startTime,
            totalDistance,
            totalRunningTimeSecond,
            uid,
            userRunCount : updateRunCount,
            createdAt : Timestamp.now()
        }))

        await userRunCountRef.update({
            runCount: FieldValue.increment(1) // 기존 값에 1을 더함
        });


        return NextResponse.json({ message: '달리기 결과가 성공적으로 저장되었습니다.', runCount: updateRunCount }, { status: 200 });
    }catch(error){
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}