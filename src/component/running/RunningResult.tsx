'use client';
import React, { useState } from 'react'
import Header from '../Header'
import DetailRunCard from '../dashboard/DetailRunCard'
import KakaoMap from '../KakaoMap'
import Button from '../Button';
import { useRunningStore } from '@/store/useRunningStore';
import { SaveRunningResultRequestBody } from '@/types/api.types';
import { RunningSummaryForSave } from '@/types/running.types';
import { formatDayOfWeek, formatTimestampToYYYYMMDD } from '@/utils/format';
import { getTimeOfDay, getToday } from '@/utils/getToday';

export default function RunningResult() {
  const {today , day} = getToday();

  const [title , setTitle] = useState<string>(`${formatDayOfWeek(day)} ${getTimeOfDay()} 러닝`)
  const {runningStartTime , runningEndTime , totalDistance, totalTime ,averagePace, path } = useRunningStore()
  
  const runData : RunningSummaryForSave = {
    runTitle : title,
    date : formatTimestampToYYYYMMDD(day),
    dayOfWeek : formatDayOfWeek(day),
    startTime : runningStartTime,
    endTime : runningEndTime,
    totalDistance : totalDistance,
    totalRunningTimeSecond : totalTime,
    avgPace : averagePace,
  }

  const body:SaveRunningResultRequestBody = {
    runData ,
    pathPoints : path.flat(),
  }
  
  const handleChangeTitle = (newTitle : string) => {
    setTitle(newTitle)
  }

  const handleSaveRunning = async() => {
    const res = await fetch('/api/running',{
      method : 'POST',
      headers : {
        'Content-Type' : 'application/json',
      },
      body : JSON.stringify(body)
    })
    console.log(res)
  }

  return (
    <article className='mb-6'>
        <Header className='flex items-center'>
            <h1>러닝 결과</h1>
            <Button className='border rounded-full px-4 py-2 bg-black text-white text-sm ml-auto' onClick={handleSaveRunning}>
              저장
            </Button>
        </Header>
        <DetailRunCard isEditable={true} date={today} title={title} distance={3} distanceLabel={'km'} runningPace={0} runningTime={0}  handleChangeTitle={handleChangeTitle}/>
        <KakaoMap className='m-auto w-[calc(100%-2rem)] h-[50dvh] mt-4' mapId={'resultMap'} latitude={37.4504924} longitude={126.6849254} level={3} />
    </article>
  )
}
