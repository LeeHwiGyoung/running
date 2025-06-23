import DetailRunCard from '@/component/dashboard/DetailRunCard'
import BackButton from '@/component/BackButton'
import React from 'react'

const dummyDetail = {
    id: 0,
    date: '2025-06-09',
    title : "월요일 저녁 러닝",
    distance : 3,
    distanceLabel : 'Km',
    runningPace : 450,
    runningTime : 1200,
    cadence : 180,
    altitude : 2,
}

export default function page() {  
  return (
    <main>
      <BackButton />
      <DetailRunCard 
        date={dummyDetail.date}
        title={dummyDetail.title}
        distance={dummyDetail.distance}
        distanceLabel={dummyDetail.distanceLabel}
        runningPace={dummyDetail.runningPace}
        runningTime={dummyDetail.runningTime}
        cadence={dummyDetail.cadence} 
      />
    </main>
  )
}
