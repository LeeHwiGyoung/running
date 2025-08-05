'use client';
import { usePathname, useRouter } from "next/navigation";
import RunCard from "./RunCard";
import { RunningData } from "@/types/running.types";

interface RunCardListProps {
  runData : RunningData[];
}
export default function RunCardList({runData} : RunCardListProps) {
  const router = useRouter();
  const pathname = usePathname()
  
  const onClickRunCard = (id : number | string) => {
    router.push(`${pathname}/runningDetail/${id}`)
  }

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
