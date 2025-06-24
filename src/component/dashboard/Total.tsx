'use client';
import React, { useMemo, useState } from 'react'
import BarGraph from './BarGraph'
import RunningInfo from './RunningInfo';

const runningData = [
  { id : 0, day: '월', runCount: 2, distance: 5.2, time: 32 },
  { id: 1, day: '화', runCount: 1, distance: 3.1, time: 20 },
  { id: 2,day: '수', runCount: 3, distance: 7.8, time: 50 },
  { id: 3,day: '목', runCount: 2, distance: 6.0, time: 38 },
  { id: 4,day: '금', runCount: 1, distance: 4.2, time: 28 },
  { id: 5,day: '토', runCount: 4, distance: 10.5, time: 70 },
  { id: 6,day: '일', runCount: 2, distance: 6.3, time: 42 },
];

export default function Total() {
  const [selectedBar , setSelectedBar] = useState<number | null>(null);

  const totalData = useMemo(()=> {
    const data = runningData.reduce((acc, cur) => {
      acc.totalRunCount += cur.runCount;
      acc.totalDistance += cur.distance;
      acc.totalTime += cur.time;
      return acc;
    }, {totalRunCount : 0 , totalDistance : 0 , totalTime : 0})
    return data;
  } , [])  
 
  const onClickBar = (index : number) => {
    setSelectedBar(index);
  }

  const onClickOutsideBar = () => {
    setSelectedBar(null);
  }
  
  return (
    <section className='relative'>
      <h2 className='sr-only'>러닝 통계</h2>
      <RunningInfo className='rounded-sm border-gray-100 border shadow-[0px_2px_5px_rgba(0,0,0,0.1)]' runCount={totalData.totalRunCount} distance={totalData.totalDistance} time={totalData.totalTime} />
      <BarGraph data={runningData} xKey={'day'} yKey={'distance'} width={540} height={200} marginBottom={30} onClickBar={onClickBar} onClickOutside={onClickOutsideBar} xAxisFontSize={16} yAxisFontSize={12} barColor={'#ADD8E6'} hoverBarColor={'#B0C4DE'}/>
      {selectedBar !== null && <RunningInfo className='absolute top-0 z-index-100 bg-white rounded-sm border-gray-100 border shadow-[0px_2px_5px_rgba(0,0,0,0.1)]' runCount={runningData[selectedBar].runCount} distance={runningData[selectedBar].distance} time={runningData[selectedBar].time}/>}
    </section>
  )
}
