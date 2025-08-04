import { formatPace, formatTime } from '@/utils/format';
import React from 'react'
interface RunCardProps {
    className ?: string;
    date : string;
    title : string;
    distance : number;
    distanceLabel : string;
    runningPace : number;
    runningTime : number;
    onClick ?: () => void;
}

export default function RunCard({className="" ,date , title ,distance , distanceLabel, runningPace , runningTime , onClick}:RunCardProps) {
  return (
    <article onClick={onClick} className={`max-w-128 p-4 shadow-[0px_1px_4px_rgba(0,0,0,0.16)] rounded-md bg-white cursor-pointer hover:shadow-[0px_5px_15px_rgba(0,0,0,0.35)] ${className}`}>
        <h4 className='font-bold'>{title}</h4>
        <time className='text-sm ml-auto mr-4t text-gray-400' dateTime={date}>{date}</time>
        <section className='flex gap-4 mt-2'>
            <h5 className='sr-only'>러닝 통계</h5>
            <div className='flex flex-col grow-1 justify-center items-center'>
                <data className="text-xl font-bold" value={distance}>{distance.toFixed(2)}</data>
                <span>{distanceLabel}</span>
            </div>
            <div className='flex flex-col grow-1 justify-center items-center'>
                <data className="text-xl font-bold" value={runningPace}>{formatPace(runningPace)}</data>
                <span>평균 페이스</span>
            </div>
            <div className='flex flex-col grow-1 justify-center items-center'>
                <data className="text-xl font-bold" value={runningTime}>{formatTime(runningTime)}</data>
                <span>시간</span>
            </div>
        </section>
    </article>
  )
}
