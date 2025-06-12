'use client';
import { usePathname, useRouter } from "next/navigation";
import RunCard from "./RunCard";

const RunCardDummyData = 
    [ 
        {
            id: 0,
            date: '2025-06-09',
            title : "월요일 저녁 러닝",
            distance : 3,
            distanceLabel : 'Km',
            runningPace : 450,
            runningTime : 1200,
        }, 
        {
            id: 1,
            date: '2025-06-08',
            title : "일요일 저녁 러닝",
            distance : 3,
            distanceLabel : 'Km',
            runningPace : 450,
            runningTime : 1200, 
        },
        {
            id: 2,
            date: '2025-06-07',
            title : "토요일 저녁 러닝",
            distance : 3,
            distanceLabel : 'Km',
            runningPace : 450,
            runningTime : 1200, 
        },
        {
            id: 3,
            date: '2025-06-06',
            title : "금요일 저녁 러닝",
            distance : 3,
            distanceLabel : 'Km',
            runningPace : 450,
            runningTime : 1200, 
}] 
export default function RunCardList() {
  const router = useRouter();
  const pathname = usePathname() 
  const onClickRunCard = (id : number | string) => {
    router.push(`${pathname}/runningDetail/${id}`)
  }

  return (
    <ul className='flex flex-col gap-8 px-2'>
        {RunCardDummyData.map((runData)=> 
            <li key={runData.id}>
                <RunCard onClick={() => onClickRunCard(runData.id)} date={runData.date} title={runData.title} distance={runData.distance} distanceLabel={runData.distanceLabel} runningPace={runData.runningPace} runningTime={runData.runningTime}/>
            </li>
        )}     
    </ul>
  )
}
