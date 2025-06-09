import RunCard from '@/component/dashboard/RunCard'
import React from 'react'

const RunCardDummyData = 
    [ 
        {
            date: '2025-06-09',
            title : "월요일 저녁 러닝",
            distance : 3,
            distanceLabel : 'Km',
            runningPace : 450,
            runningTime : 1200,
        }, 
        {
            date: '2025-06-08',
            title : "일요일 저녁 러닝",
            distance : 3,
            distanceLabel : 'Km',
            runningPace : 450,
            runningTime : 1200, 
        },
        {
            date: '2025-06-07',
            title : "토요일 저녁 러닝",
            distance : 3,
            distanceLabel : 'Km',
            runningPace : 450,
            runningTime : 1200, 
        },
        {
            date: '2025-06-06',
            title : "금요일 저녁 러닝",
            distance : 3,
            distanceLabel : 'Km',
            runningPace : 450,
            runningTime : 1200, 
        }] 

export default function page() {
  return (
    <>
      <header className="py-4">
        <h2 className="font-bold text-lg p-2">통계</h2>
      </header>
      <main className='mb-16'>
        <section className='space-y-4'>
            <h3>최근 활동</h3>
            <ul className='flex flex-col gap-8 px-2'>            
                {RunCardDummyData.map((runData)=> 
                    <li key={runData.date + runData.title}>
                        <RunCard date={runData.date} title={runData.title} distance={runData.distance} distanceLabel={runData.distanceLabel} runningPace={runData.runningPace} runningTime={runData.runningTime}/>
                    </li>
                )}                
            </ul>
        </section>
      </main>
    </>
  )
}
