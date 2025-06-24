'use client';
import { formatPace, formatTime } from '@/utils/format'
import React from 'react'
import useCountUp from '@/hooks/useCountUp'

interface DetailRunCardProps {
    date: string,
    title : string,
    distance : number,
    distanceLabel : string,
    runningPace : number,
    runningTime : number,
    cadence : number,
}

export default function DetailRunCard({
    date,
    title,
    distance,
    distanceLabel,
    runningPace,
    runningTime,
    cadence,
}:DetailRunCardProps) {
  const count = useCountUp({target : distance})
  
  return (
    <article className='flex flex-col gap-4 px-4'>
        <div>
            <h2 className='text-xl font-bold'>
                {title}
            </h2>
            <time className='text-gray-400' dateTime={date}>{date}</time> 
        </div>
        <div className='flex items-end text-5xl gap-1'>
            <data className="font-bold" value={distance}>{count.toFixed(2).toLocaleString()}</data>
            <span className='text-2xl'>{distanceLabel}</span>
        </div>
        <section className='flex'>
            <h3 className='sr-only'>러닝 통계</h3>
            <div className='flex flex-col grow-1'>
                <data className="text-xl font-bold" value={runningPace}>{formatPace(runningPace)}</data>
                <span>평균 페이스</span>
            </div>
            <div className='flex flex-col grow-1'>
                <data className="text-xl font-bold" value={runningTime}>{formatTime(runningTime)}</data>
                <span>시간</span>
            </div>
            <div className='flex flex-col grow-1'>
                <data className="text-xl font-bold" value={cadence}>{cadence}</data>
                <span>케이던스</span>
            </div>
        </section>
    </article>
  )
}
