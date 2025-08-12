import { RunningData, TotalRun } from "@/types/running.types";

export function processedTotalData(data :RunningData[]) {
    const dayOrder = ['월요일', '화요일', '수요일', '목요일', '금요일', '토요일', '일요일'];
    const totalMap  = new Map<string , TotalRun>

    if(data.length > 0) {        
        data.forEach((running) => {
            const day = running.dayOfWeek;
            if(!totalMap.has(day)){
                totalMap.set(day, {
                    day : running.dayOfWeek,
                    runCount : 1,
                    distance : running.totalDistance,
                    time : running.totalRunningTimeSecond,
                })
            }else {
                const dayTotal = totalMap.get(day)!;
                dayTotal.runCount += 1;
                dayTotal.distance += running.totalDistance;
                dayTotal.time += running.totalRunningTimeSecond;
            }
        })    
    }

    const result = dayOrder.map((day) => {
        if (totalMap.has(day)) {
            return totalMap.get(day)!;
        }
        return {
            day,
            runCount: 0,
            distance: 0,
            time: 0,
        };
    });

  return result;
}