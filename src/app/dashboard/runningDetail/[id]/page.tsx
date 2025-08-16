import DetailRunCard from '@/component/dashboard/DetailRunCard'
import BackButton from '@/component/BackButton'
import React from 'react'
import Header from '@/component/Header'
import DetailRunPerformaceView from '@/component/dashboard/DetailRunPerformaceView'
import { headers } from 'next/headers'
import { PathPoint, RunningData } from '@/types/running.types'

export default async function page({params} : {params :  Promise<{id : string}>}) {
  const { id }  = await params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/dashboard/runningDetail/${id}` , {
      credentials: 'include',
      cache: 'no-store',
      headers: {
        Cookie: (await headers()).get('cookie') || '',
      }
  });
  const runDetailData  = await res.json();
  const runDetail = runDetailData.runDetail as RunningData;
  const pathPoints = runDetailData.pathPoints as PathPoint[];

  return (
    <main>
      <Header className='w-full mb-4' borderBottomShadow={true}>
        <BackButton />
      </Header>
      <DetailRunCard
        date={runDetail.date}
        title={runDetail.runTitle}
        distance={runDetail.totalDistance}
        distanceLabel={'Km'}
        runningPace={runDetail.avgPace}
        runningTime={runDetail.totalRunningTimeSecond}
      />
      <section className='mb-18'>
        <DetailRunPerformaceView position={{latitude : 37.4504924 , longitude : 126.6849254}} pathPoints={pathPoints}/>
      </section>
    </main>
  )
}
