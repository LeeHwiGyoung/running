'use client';
import React, { useState } from 'react'
import Header from '../Header'
import DetailRunCard from '../dashboard/DetailRunCard'
import KakaoMap from '../KakaoMap'

export default function RunningResult() {
  const [title , setTitle] = useState<string>("화요일 오후 러닝")

  const handleChangeTitle = (newTitle : string) => {
    setTitle(newTitle)
  }

  return (
    <article className='mb-6'>
        <Header>
            <h1>러닝 결과</h1>
        </Header>
        <DetailRunCard isEditable={true} date={'2025-06-24'} title={title} distance={3} distanceLabel={'km'} runningPace={0} runningTime={0} cadence={0} handleChangeTitle={handleChangeTitle}/>
        <KakaoMap className='m-auto w-[calc(100%-2rem)] h-[50dvh] mt-4' mapId={'resultMap'} latitude={37.4504924} longitude={126.6849254} level={3} />
    </article>
  )
}
