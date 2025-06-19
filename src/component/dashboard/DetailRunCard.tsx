'use client';
import { formatPace, formatTime } from '@/utils/format'
import React from 'react'
import useCountUp from '@/hooks/useCountUp'
import DetailRunPerformaceView from './DetailRunPerformaceView';

interface DetailRunCardProps {
    date: string,
    title : string,
    distance : number,
    distanceLabel : string,
    runningPace : number,
    runningTime : number,
    cadence : number,
}

/* const dummyPath = [
  {"latitude": 37.4504924, "longitude": 126.6855140, "timestamp": 1718012400000},
  {"latitude": 37.4506140, "longitude": 126.6854992, "timestamp": 1718012402500},
  {"latitude": 37.4507024, "longitude": 126.6853755, "timestamp": 1718012405000},
  {"latitude": 37.4507502, "longitude": 126.6851608, "timestamp": 1718012407500},
  {"latitude": 37.4507567, "longitude": 126.6849254, "timestamp": 1718012410000},
  {"latitude": 37.4507198, "longitude": 126.6846890, "timestamp": 1718012412500},
  {"latitude": 37.4506385, "longitude": 126.6844744, "timestamp": 1718012415000},
  {"latitude": 37.4505168, "longitude": 126.6843507, "timestamp": 1718012417500},
  {"latitude": 37.4504284, "longitude": 126.6842797, "timestamp": 1718012420000},
  {"latitude": 37.4503806, "longitude": 126.6841440, "timestamp": 1718012422500},
  {"latitude": 37.4503741, "longitude": 126.6839086, "timestamp": 1718012425000},
  {"latitude": 37.4504110, "longitude": 126.6836722, "timestamp": 1718012427500},
  {"latitude": 37.4504924, "longitude": 126.6835000, "timestamp": 1718012430000},
  {"latitude": 37.4503708, "longitude": 126.6835148, "timestamp": 1718012432500},
  {"latitude": 37.4502824, "longitude": 126.6836385, "timestamp": 1718012435000},
  {"latitude": 37.4502346, "longitude": 126.6838532, "timestamp": 1718012437500},
  {"latitude": 37.4502281, "longitude": 126.6840886, "timestamp": 1718012440000},
  {"latitude": 37.4502650, "longitude": 126.6843250, "timestamp": 1718012442500},
  {"latitude": 37.4503463, "longitude": 126.6845396, "timestamp": 1718012445000},
  {"latitude": 37.4504680, "longitude": 126.6846633, "timestamp": 1718012447500},
  {"latitude": 37.4505564, "longitude": 126.6847343, "timestamp": 1718012450000},
  {"latitude": 37.4506042, "longitude": 126.6848699, "timestamp": 1718012452500},
  {"latitude": 37.4506107, "longitude": 126.6851053, "timestamp": 1718012455000},
  {"latitude": 37.4505738, "longitude": 126.6853417, "timestamp": 1718012457500},
] */



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
    <article className='px-4'>
        <h2 className='text-2xl font-bold'>
            {title}
        </h2>
        <time dateTime={date}>{date}</time> 
        <div className='flex flex-col'>
            <data className="text-7xl font-bold transition" value={distance}>{count.toFixed(2).toLocaleString()}</data>
            <span>{distanceLabel}</span>
        </div>
        <section className='flex mt-4'>
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
        <section className='mb-18'>
            <DetailRunPerformaceView position={{latitude : 37.4504924 , longitude : 126.6849254}}/>
        </section>
    </article>
  )
}
