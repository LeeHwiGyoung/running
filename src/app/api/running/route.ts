import { SaveRunningResultRequestBody } from "@/types/api.types";
import { NextRequest, NextResponse } from "next/server";
import { firestoreAdmin } from "../../../../lib/firebase/admin";
import { FieldValue, Timestamp } from "firebase-admin/firestore";
import { authenticate } from "../../../../lib/firebase/auth-middleware";
import { chunksArray } from "@/utils/chunks";

export async function POST (request : NextRequest) {
    try{
        const decodedToken = await authenticate();
        const uid = decodedToken.uid;

        const body = (await request.json()) as SaveRunningResultRequestBody;

        const {runData , pathPoints} = body;
        const {runTitle , date , startTime , endTime ,totalDistance, totalRunningTimeSecond , avgPace , dayOfWeek} = runData;
    
        const transActionResult = await firestoreAdmin.runTransaction(async(transaction) => {
            const userRunCountRef = firestoreAdmin.collection('userRunCounter').doc(uid);
            const runsDocRef = firestoreAdmin.collection('runs').doc();

            const runCountDoc = await transaction.get(userRunCountRef);
            const currentRunCount = runCountDoc.exists ? runCountDoc.data()?.runCount : 0;
            const newRunCount = currentRunCount + 1;

            transaction.set(runsDocRef , {
                runTitle, 
                avgPace,
                date,
                dayOfWeek,
                endTime,
                startTime,
                totalDistance,
                totalRunningTimeSecond,
                uid,
                userRunCount : newRunCount,
                createdAt : Timestamp.now()
            }); //runsDoc 에 저장

            if(runCountDoc.exists){
                transaction.update(userRunCountRef , {
                    runCount : FieldValue.increment(1)
                })
            }else {
                transaction.set(userRunCountRef , {runCount : 1}) // 이전 기록이 없으면 1로 저장
            }
            return {runsDocRef , newRunCount}; // 업데이트 된 runCount 와 runsDocRef 리턴
        })
        
        if(pathPoints  && pathPoints.length > 0) {
            const chunkedPoints = chunksArray(20, pathPoints);
            const chunkSave = chunkedPoints.map(({point , chunkId})=> {
                const chunkRef = transActionResult.runsDocRef.collection('pathpoints').doc();
                return chunkRef.set({
                    chunkId : chunkId,
                    pathPoints : point
                })
            })
            await Promise.all(chunkSave);
        }
        
        return NextResponse.json({ message: '달리기 결과가 성공적으로 저장되었습니다.', runCount: transActionResult.newRunCount }, { status: 200 });
    }catch(error){
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}