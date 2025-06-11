import { formatTime } from '@/utils/format';
import React from 'react'

interface RunningInfoProps {
  className ?: string;
  runCount ?: number;
  distance : number;
  time : number
}

export default function RunningInfo({className,runCount , distance, time} : RunningInfoProps) {
  const baseClassNames = "flex w-full text-center text-2xl font-bold"
  let lastClassName = baseClassNames;
  if(className){
     lastClassName += ` ${className}`;
  }

  return (
    <article className={`${lastClassName}`}>
        <h3 className='sr-only'>러닝 정보</h3>
        <div className='grow-1 flex flex-col'>
            <data value={runCount}>{runCount}</data>
            <span>번</span>
        </div>
        <div className='grow-1 flex flex-col'>
            <data value={distance.toFixed(1)}>{distance.toFixed(1)}</data>
            <span>Km</span>
        </div>
        <div className='grow-1 flex flex-col'>
            <data value={formatTime(time)}>{formatTime(time)}</data>
            <span>시간</span>
        </div>
    </article>
  )
}
