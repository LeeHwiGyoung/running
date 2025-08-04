'use client';
import React, { useState } from 'react'
import KakaoMap from '../KakaoMap'
import { Coordinate } from '@/types/type';
import Button from '../Button';
import LineGraph from './LineGraph';
import { formatPace } from '@/utils/format';
import { PathPoint } from '@/types/running.types';


interface DetailRunPerformaceViewProps {
    position : Coordinate;
    pathPoints : PathPoint[];
}

export default function DetailRunPerformaceView({position , pathPoints} : DetailRunPerformaceViewProps) {
  const [clickedButton , setClickedButton] = useState<string>('pace');
  const [avgPace ,setAvgPace] = useState<string>("");
 /*  const [avgCadence, setAvgCadence] = useState<string>("");*/
  const [hoveredSegmentId, setHoveredSegmentId] = useState<number|null>(null);

  
  const onClickButton = (id : string) => {
    setClickedButton(id);
  }
 /*  const dummyPath = dummyPace.map((data)=> {
    const id = data.properties.id;
    const latitude = data.geometry.coordinates[1];
    const longitude = data.geometry.coordinates[0];
    return {id, latitude , longitude}  
    }
  ) */



  return (
    <>
        <KakaoMap className='w-full h-[200px]' mapId='detailMap' latitude={position.latitude} longitude={position.longitude} level={2} />
        <div className='flex gap-4 mt-4'>
            <Button className={`grow-1 border p-4 border-gray-200 rounded-md hover:bg-[#B0C4DE] ${clickedButton === 'pace' ? 'bg-[#B0C4DE]' : 'bg-white'}`} onClick={()=> onClickButton('pace')}>
                <span>페이스</span>
                <span>{avgPace}</span>
            </Button>
            {
              /*
               <Button className={`grow-1 border p-4 border-gray-200 rounded-md hover:bg-[#B0C4DE] ${clickedButton === 'cadence' ? 'bg-[#B0C4DE]' : 'bg-white'}`} onClick={()=> onClickButton('cadence')}>
                <span>케이던스</span>
                <span>{avgCadence}</span>
               </Button>
              */
            }
         </div>

          {clickedButton === 'pace' && (
                <LineGraph<PathPoint>
                    id="paceGraph"
                    data={pathPoints}
                    xKey={'curDistance'}
                    yKey={'curPace'} 
                    reverseYAxis={true}
                    width={800}
                    height={400}
                    marginLeft={60}
                    yAxisFontSize={14}
                    xAxisFontSize={14}
                    setButtonText={setAvgPace}
                    setHoveredSegmentId={setHoveredSegmentId}
                    tickFormatFunc={formatPace}
                />
            )}
    </>
  )
}
