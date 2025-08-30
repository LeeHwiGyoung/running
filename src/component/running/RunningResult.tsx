'use client';
import React, { useState } from 'react'
import Header from '../Header'
import DetailRunCard from '../dashboard/DetailRunCard'
import KakaoMap from '../KakaoMap'
import Button from '../Button';
import { useRunningStore } from '@/store/useRunningStore';
import { SaveRunningResultRequestBody } from '@/types/api.types';
import { RunningSummaryForSave } from '@/types/running.types';
import { formatDayOfWeek } from '@/utils/format';
import { getTimeOfDay, getToday } from '@/utils/getToday';
import LoadingSpinner from '../LoadingSpinner';
import { useRouter } from 'next/navigation';

export default function RunningResult() {
  const {today , day} = getToday();

  const [title , setTitle] = useState<string>(`${formatDayOfWeek(day)} ${getTimeOfDay()} 러닝`)
  const [loading , setLoading] = useState<boolean>(false);
  const [error ,setError] = useState<string>("");
  const {runningStartTime , runningEndTime , totalDistance, totalTime ,averagePace, path } = useRunningStore()
  const router = useRouter();
  const runData : RunningSummaryForSave = {
    runTitle : title,
    date : today,
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
    try{
      setLoading(true);
      const res = await fetch('/api/running',{
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json',
        },
        body : JSON.stringify(body)
      })
      if(!res.ok){
        setError('네트워크 오류가 발생했습니다.')
      }
      router.push('/');
    }catch(error){
      setError(error.message)
    }finally{
      setLoading(false);
    }
  }



  return (
    <>
    <article className='mb-6 relative'>
        <Header className='flex items-center'>
            <h1>러닝 결과</h1>
            <Button className='border rounded-full px-4 py-2 bg-black text-white text-sm ml-auto' onClick={handleSaveRunning}>
              저장
            </Button>
        </Header>
        <DetailRunCard isEditable={true} date={today} title={title} distance={totalDistance} distanceLabel={'km'} runningPace={averagePace} runningTime={totalTime}  handleChangeTitle={handleChangeTitle}/>
        <KakaoMap className='m-auto w-[calc(100%-2rem)] h-[50dvh] mt-4' mapId={'resultMap'} latitude={37.4504924} longitude={126.6849254} level={3} points={path.flat()} />
    </article>
    {loading && <LoadingSpinner />}
    {error.length > 0 && alert(error)}
    </>
  )
}
