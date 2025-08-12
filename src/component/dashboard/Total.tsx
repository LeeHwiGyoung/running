'use client';
import React, { useMemo, useState } from 'react'
import BarGraph from './BarGraph'
import RunningInfo from './RunningInfo';
import { RunningData } from '@/types/running.types';
import { processedTotalData } from '@/utils/total';
import TotalCategory from './TotalCategory';

interface TotalProps {
  initData : RunningData[];
}

export default function Total({initData} : TotalProps) {
  const [selectedBar , setSelectedBar] = useState<number | null>(null);
  const runningData = useMemo(() => processedTotalData(initData), [initData]);

  const totalData = useMemo(()=> {
    const data = runningData.reduce((acc, cur) => {
      acc.totalRunCount += cur.runCount;
      acc.totalDistance += cur.distance;
      acc.totalTime += cur.time;
      return acc;
    }, {totalRunCount : 0 , totalDistance : 0 , totalTime : 0})
    return data;
  } , [runningData])  
 
  const onClickBar = (index : number) => {
    setSelectedBar(index);
  }

  const onClickOutsideBar = () => {
    setSelectedBar(null);
  }
  
  return (
    <section className='relative px-2'>
      <h2 className='sr-only'>총 러닝 통계</h2>
      <TotalCategory position='right' className='m-2'/>
      <RunningInfo className='rounded-sm border-gray-100 border shadow-[0px_2px_5px_rgba(0,0,0,0.1)] py-4' runCount={totalData.totalRunCount} distance={totalData.totalDistance} time={totalData.totalTime} />
      <BarGraph data={runningData} xKey={'day'} yKey={'distance'} width={540} height={200} marginBottom={30} onClickBar={onClickBar} onClickOutside={onClickOutsideBar} xAxisFontSize={16} yAxisFontSize={12} barColor={'#ADD8E6'} hoverBarColor={'#B0C4DE'}/>
      {selectedBar !== null && <RunningInfo className='absolute top-0 z-index-100 bg-white rounded-sm border-gray-100 border shadow-[0px_2px_5px_rgba(0,0,0,0.1)] py-4' runCount={runningData[selectedBar].runCount} distance={runningData[selectedBar].distance} time={runningData[selectedBar].time}/>}
    </section>
  )
}
