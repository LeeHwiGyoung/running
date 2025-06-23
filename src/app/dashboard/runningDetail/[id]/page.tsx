import DetailRunCard from '@/component/dashboard/DetailRunCard'
import BackButton from '@/component/BackButton'
import React from 'react'
import Header from '@/component/Header'

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
      <Header className='w-full mb-4' borderBottomShadow={true}>
        <BackButton />
      </Header>
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
