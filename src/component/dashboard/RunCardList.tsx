'use client';
import { usePathname, useRouter } from "next/navigation";
import RunCard from "./RunCard";
import { useEffect, useState } from "react";
import { RunningData } from "@/types/running.types";

export default function RunCardList() {
  const router = useRouter();
  const pathname = usePathname()
  const [runData , setRunData] = useState<RunningData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const onClickRunCard = (id : number | string) => {
    router.push(`${pathname}/runningDetail/${id}`)
  }

  useEffect(() => {
    const getRunningCardList = async () => {
        setIsLoading(true);
        try{
            const res = await fetch('api/dashboard/runCardList');
            if(!res.ok){
                throw new Error('failed fetch runCardList')
            }
            const data = await res.json();
            setRunData(data.runs);
        }catch(error){
            console.error('Error fetching runs:', error);
            // 사용자에게 오류 메시지를 표시하는 등의 에러 처리 로직 추가
        }finally{
            setIsLoading(false);
        }
    } 
    getRunningCardList()
  }, [])

  return (
    <ul className='flex flex-col gap-8 px-2'>
        {runData.map((runData)=> 
            <li key={runData.id}>
                <RunCard onClick={() => onClickRunCard(runData.id)} date={runData.date} title={runData.runTitle} distance={runData.totalDistance} distanceLabel={'Km'} runningPace={runData.avgPace} runningTime={runData.totalRunningTimeSecond}/>
            </li>
        )}     
    </ul>
  )
}
