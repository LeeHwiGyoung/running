import { formatTime } from '@/utils/format';
import React from 'react'

interface RunningInfoProps {
  className ?: string;
  runCount ?: number;
  distance : number;
  time : number
}

export default function RunningInfo({className="",runCount , distance, time} : RunningInfoProps) {
  const baseClassNames = "flex w-full text-center text-xl font-bold"
  let lastClassName = baseClassNames;
  if(className){
     lastClassName += ` ${className}`;
  }

  return (
    <article className={`${lastClassName}`}>
        <h3 className='sr-only'>러닝 정보</h3>
        <div className='grow-1 flex flex-col'>
            <data value={runCount}>{runCount}</data>
            <span className='font-normal text-base'>번</span>
        </div>
        <div className='grow-1 flex flex-col'>
            <data value={distance.toFixed(1)}>{distance.toFixed(1)}</data>
            <span className='font-normal text-base'>Km</span>
        </div>
        <div className='grow-1 flex flex-col'>
            <data value={formatTime(time)}>{formatTime(time)}</data>
            <span className='font-normal text-base'>시간</span>
        </div>
    </article>
  )
}
