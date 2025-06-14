'use client';
import React, { useState } from 'react'
import KakaoMap from '../KakaoMap'
import { UserPosition } from '@/types/type';
import Button from '../ui/Button';
import LineGraph from './LineGraph';
const dummyPace = [
    {
      
      "geometry": {
        "type": "Point",
        "coordinates": [
          126.685514,
          37.4504924,
        ]
      },
      "properties": {
        "id": 0,
        "timestamp": "2024-06-10T07:00:00.000Z",
        "elapsedTimeSeconds": 0,
        "distanceFromPrevKm": 0,
        "cumulativeDistanceKm": 0,
        "instantPaceSecondsPerKm": 0,
        "instantPaceFormatted": "0",
        "averagePaceSecondsPerKm": 0,
        "averagePaceFormatted": "0:00"
      }
    },
    {
      
      "geometry": {
        "type": "Point",
        "coordinates": [
          126.6854992,
          37.450614
        ]
      },
      "properties": {
        "id": 1,
        "timestamp": "2024-06-10T07:00:02.500Z",
        "elapsedTimeSeconds": 2.5,
        "distanceFromPrevKm": 0.0135,
        "cumulativeDistanceKm": 0.0135,
        "instantPaceSecondsPerKm": 185.19,
        "instantPaceFormatted": "185",
        "averagePaceSecondsPerKm": 185.19,
        "averagePaceFormatted": "3:05"
      }
    },
    {
      
      "geometry": {
        "type": "Point",
        "coordinates": [
          126.6853755,
          37.4507024,
        ]
      },
      "properties": {
        "id": 2,
        "timestamp": "2024-06-10T07:00:05.000Z",
        "elapsedTimeSeconds": 5,
        "distanceFromPrevKm": 0.0138,
        "cumulativeDistanceKm": 0.0273,
        "instantPaceSecondsPerKm": 181.16,
        "instantPaceFormatted": "181",
        "averagePaceSecondsPerKm": 183.15,
        "averagePaceFormatted": "3:03"
      }
    },
    {
      
      "geometry": {
        "type": "Point",
        "coordinates": [
          126.6851608,
          37.4507502,
        ]
      },
      "properties": {
        "id": 3,
        "timestamp": "2024-06-10T07:00:07.500Z",
        "elapsedTimeSeconds": 7.5,
        "distanceFromPrevKm": 0.0189,
        "cumulativeDistanceKm": 0.0462,
        "instantPaceSecondsPerKm": 132.28,
        "instantPaceFormatted": "132",
        "averagePaceSecondsPerKm": 162.34,
        "averagePaceFormatted": "2:42"
      }
    },
    {
      
      "geometry": {
        "type": "Point",
        "coordinates": [
          126.6849254,
          37.4507567,
        ]
      },
      "properties": {
        "id": 4,
        "timestamp": "2024-06-10T07:00:10.000Z",
        "elapsedTimeSeconds": 10,
        "distanceFromPrevKm": 0.0202,
        "cumulativeDistanceKm": 0.0664,
        "instantPaceSecondsPerKm": 123.76,
        "instantPaceFormatted": "124",
        "averagePaceSecondsPerKm": 150.60,
        "averagePaceFormatted": "2:30"
      }
    },
    {
      
      "geometry": {
        "type": "Point",
        "coordinates": [
          126.684689,
          37.4507198,
        ]
      },
      "properties": {
        "id": 5,
        "timestamp": "2024-06-10T07:00:12.500Z",
        "elapsedTimeSeconds": 12.5,
        "distanceFromPrevKm": 0.0207,
        "cumulativeDistanceKm": 0.0871,
        "instantPaceSecondsPerKm": 120.77,
        "instantPaceFormatted": "121",
        "averagePaceSecondsPerKm": 143.51,
        "averagePaceFormatted": "2:23"
      }
    },
    {
      
      "geometry": {
        "type": "Point",
        "coordinates": [
          126.6844744,
          37.4506385,
        ]
      },
      "properties": {
        "id": 6,
        "timestamp": "2024-06-10T07:00:15.000Z",
        "elapsedTimeSeconds": 15,
        "distanceFromPrevKm": 0.0203,
        "cumulativeDistanceKm": 0.1074,
        "instantPaceSecondsPerKm": 123.15,
        "instantPaceFormatted": "123",
        "averagePaceSecondsPerKm": 139.66,
        "averagePaceFormatted": "2:19"
      }
    },
    {
      
      "geometry": {
        "type": "Point",
        "coordinates": [
          126.6843507,
          37.4505168,
        ]
      },
      "properties": {
        "id": 7,
        "timestamp": "2024-06-10T07:00:17.500Z",
        "elapsedTimeSeconds": 17.5,
        "distanceFromPrevKm": 0.0152,
        "cumulativeDistanceKm": 0.1226,
        "instantPaceSecondsPerKm": 164.47,
        "instantPaceFormatted": "164",
        "averagePaceSecondsPerKm": 142.74,
        "averagePaceFormatted": "2:22"
      }
    },
    {
      
      "geometry": {
        "type": "Point",
        "coordinates": [
          126.6842797,
          37.4504284,
        ]
      },
      "properties": {
        "id": 8,
        "timestamp": "2024-06-10T07:00:20.000Z",
        "elapsedTimeSeconds": 20,
        "distanceFromPrevKm": 0.0108,
        "cumulativeDistanceKm": 0.1334,
        "instantPaceSecondsPerKm": 231.48,
        "instantPaceFormatted": "231",
        "averagePaceSecondsPerKm": 149.93,
        "averagePaceFormatted": "2:29"
      }
    },
    {
      
      "geometry": {
        "type": "Point",
        "coordinates": [
          126.684144,
          37.4503806,
        ]
      },
      "properties": {
        "id": 9,
        "timestamp": "2024-06-10T07:00:22.500Z",
        "elapsedTimeSeconds": 22.5,
        "distanceFromPrevKm": 0.0118,
        "cumulativeDistanceKm": 0.1452,
        "instantPaceSecondsPerKm": 211.86,
        "instantPaceFormatted": "211",
        "averagePaceSecondsPerKm": 155.09,
        "averagePaceFormatted": "2:35"
      }
    },
    {
      
      "geometry": {
        "type": "Point",
        "coordinates": [
          126.6839086,
          37.4503741,
        ]
      },
      "properties": {
        "id": 10,
        "timestamp": "2024-06-10T07:00:25.000Z",
        "elapsedTimeSeconds": 25,
        "distanceFromPrevKm": 0.0202,
        "cumulativeDistanceKm": 0.1654,
        "instantPaceSecondsPerKm": 123.76,
        "instantPaceFormatted": "124",
        "averagePaceSecondsPerKm": 151.15,
        "averagePaceFormatted": "2:31"
      }
    },
    {  
      "geometry": {
        "type": "Point",
        "coordinates": [
          126.6836722,
          37.450411,
        ]
      },
      "properties": {
        "id": 11,
        "timestamp": "2024-06-10T07:00:27.500Z",
        "elapsedTimeSeconds" : 27.5,
        "distanceFromPrevKm": 0.0207,
        "cumulativeDistanceKm": 0.1861,
        "instantPaceSecondsPerKm": 120.77,
        "instantPaceFormatted": "121",
        "averagePaceSecondsPerKm": 134.44,
        "averagePaceFormatted": "2:14"
      }
    },
    {
      
      "geometry": {
        "type": "Point",
        "coordinates": [
          126.6835,
          37.4504924,
        ]
      },
      "properties": {
        "id": 12,
        "timestamp": "2024-06-10T07:00:30.000Z",
        "elapsedTimeSeconds": 30,
        "distanceFromPrevKm": 0.0197,
        "cumulativeDistanceKm": 0.2058,
        "instantPaceSecondsPerKm": 126.90,
        "instantPaceFormatted": "126",
        "averagePaceSecondsPerKm": 145.77,
        "averagePaceFormatted": "2:25"
      }
    },
    {
      
      "geometry": {
        "type": "Point",
        "coordinates": [
          126.6835148,
          37.4503708,
        ]
      },
      "properties": {
        "id": 13,
        "timestamp": "2024-06-10T07:00:32.500Z",
        "elapsedTimeSeconds": 32.5,
        "distanceFromPrevKm": 0.0135,
        "cumulativeDistanceKm": 0.2193,
        "instantPaceSecondsPerKm": 185.19,
        "instantPaceFormatted": "185",
        "averagePaceSecondsPerKm": 148.20,
        "averagePaceFormatted": "2:28"
      }
    },
    {
      
      "geometry": {
        "type": "Point",
        "coordinates": [
          126.6836385,
          37.4502824,
        ]
      },
      "properties": {
        "id": 14,
        "timestamp": "2024-06-10T07:00:35.000Z",
        "elapsedTimeSeconds": 35,
        "distanceFromPrevKm": 0.0138,
        "cumulativeDistanceKm": 0.2331,
        "instantPaceSecondsPerKm": 181.16,
        "instantPaceFormatted": "181",
        "averagePaceSecondsPerKm": 150.15,
        "averagePaceFormatted": "2:30"
      }
    },
    {
      
      "geometry": {
        "type": "Point",
        "coordinates": [
          126.6838532,
          37.4502346,
        ]
      },
      "properties": {
        "id": 15,
        "timestamp": "2024-06-10T07:00:37.500Z",
        "elapsedTimeSeconds": 37.5,
        "distanceFromPrevKm": 0.0189,
        "cumulativeDistanceKm": 0.2520,
        "instantPaceSecondsPerKm": 132.28,
        "instantPaceFormatted": "132",
        "averagePaceSecondsPerKm": 148.81,
        "averagePaceFormatted": "2:28"
      }
    },
    {
      
      "geometry": {
        "type": "Point",
        "coordinates": [
          126.6840886,
          37.4502281,
        ]
      },
      "properties": {
        "id": 16,
        "timestamp": "2024-06-10T07:00:40.000Z",
        "elapsedTimeSeconds": 40,
        "distanceFromPrevKm": 0.0202,
        "cumulativeDistanceKm": 0.2722,
        "instantPaceSecondsPerKm": 123.76,
        "instantPaceFormatted": "124",
        "averagePaceSecondsPerKm": 146.99,
        "averagePaceFormatted": "2:26"
      }
    },
    {
      
      "geometry": {
        "type": "Point",
        "coordinates": [
          126.684325,
          37.450265,
        ]
      },
      "properties": {
        "id": 17,
        "timestamp": "2024-06-10T07:00:42.500Z",
        "elapsedTimeSeconds": 42.5,
        "distanceFromPrevKm": 0.0207,
        "cumulativeDistanceKm": 0.2929,
        "instantPaceSecondsPerKm": 120.77,
        "instantPaceFormatted": "121",
        "averagePaceSecondsPerKm": 145.10,
        "averagePaceFormatted": "2:25"
      }
    },
    {
      
      "geometry": {
        "type": "Point",
        "coordinates": [
          126.6845396,
          37.4503463,
        ]
      },
      "properties": {
        "id": 18,
        "timestamp": "2024-06-10T07:00:45.000Z",
        "elapsedTimeSeconds": 45,
        "distanceFromPrevKm": 0.0203,
        "cumulativeDistanceKm": 0.3132,
        "instantPaceSecondsPerKm": 123.15,
        "instantPaceFormatted": "123",
        "averagePaceSecondsPerKm": 143.68,
        "averagePaceFormatted": "2:23"
      }
    },
    {
      
      "geometry": {
        "type": "Point",
        "coordinates": [
          126.6846633,
          37.450468,
        ]
      },
      "properties": {
        "id": 19,
        "timestamp": "2024-06-10T07:00:47.500Z",
        "elapsedTimeSeconds": 47.5,
        "distanceFromPrevKm": 0.0152,
        "cumulativeDistanceKm": 0.3284,
        "instantPaceSecondsPerKm": 164.47,
        "instantPaceFormatted": "164",
        "averagePaceSecondsPerKm": 144.64,
        "averagePaceFormatted": "2:24"
      }
    },
    {
      
      "geometry": {
        "type": "Point",
        "coordinates": [
          126.6847343,
          37.4505564,
        ]
      },
      "properties": {
        "id": 20,
        "timestamp": "2024-06-10T07:00:50.000Z",
        "elapsedTimeSeconds": 50,
        "distanceFromPrevKm": 0.0108,
        "cumulativeDistanceKm": 0.3392,
        "instantPaceSecondsPerKm": 231.48,
        "instantPaceFormatted": "231",
        "averagePaceSecondsPerKm": 147.38,
        "averagePaceFormatted": "2:27"
      }
    },
    {
      
      "geometry": {
        "type": "Point",
        "coordinates": [
          126.6848699,
          37.4506042,
        ]
      },
      "properties": {
        "id": 21,
        "timestamp": "2024-06-10T07:00:52.500Z",
        "elapsedTimeSeconds": 52.5,
        "distanceFromPrevKm": 0.0118,
        "cumulativeDistanceKm": 0.3510,
        "instantPaceSecondsPerKm": 211.86,
        "instantPaceFormatted": "211",
        "averagePaceSecondsPerKm": 149.57,
        "averagePaceFormatted": "2:29"
      }
    },
    {
      "geometry": {
        "type": "Point",
        "coordinates": [
          126.6851053,
          37.4506107,
        ]
      },
      "properties": {
        "id": 22,
        "timestamp": "2024-06-10T07:00:55.000Z",
        "elapsedTimeSeconds": 55,
        "distanceFromPrevKm": 0.0202,
        "cumulativeDistanceKm": 0.3712,
        "instantPaceSecondsPerKm": 123.76,
        "instantPaceFormatted": "124",
        "averagePaceSecondsPerKm": 148.16,
        "averagePaceFormatted": "2:28"
      }
    },
    {
      
      "geometry": {
        "type": "Point",
        "coordinates": [
          126.6853417,
          37.4505738,
        ]
      },
      "properties": {
        "id": 23,
        "timestamp": "2024-06-10T07:00:57.500Z",
        "elapsedTimeSeconds": 57.5,
        "distanceFromPrevKm": 0.0207,
        "cumulativeDistanceKm": 0.3919,
        "instantPaceSecondsPerKm": 120.77,
        "instantPaceFormatted": "121",
        "averagePaceSecondsPerKm": 146.69,
        "averagePaceFormatted": "2:26"
      }
    }
]


interface DetailRunCardModalProps {
    runningData : {latitude: number, longitude: number, timestamp: number}[];
    position : UserPosition;
}

export default function DetailRunCardModal({runningData , position} : DetailRunCardModalProps) {
  const [clickedButton , setClickedButton] = useState<string|null>(null);
  const [avgPace ,setAvgPace] = useState<string>("");
  const [hoveredSegmentId, setHoveredSegmentId] = useState<number|null>(null);

  const onClickButton = (id : string) => {
    setClickedButton(id);
  }



  const dummyPath = dummyPace.map((data)=> {
    const id = data.properties.id;
    const latitude = data.geometry.coordinates[1];
    const longitude = data.geometry.coordinates[0];
    return {id, latitude , longitude}  
    }
  )

  return (
    <>
        <KakaoMap className='w-full h-[200px]'latitude={position.latitude} longitude={position.longitude} level={2} dummyPath={dummyPath} hoveredSegmentId={hoveredSegmentId} />
        <div className='flex gap-4 mt-4'>
            <Button className={`grow-1 border p-4 border-gray-200 rounded-md hover:bg-green-400 ${clickedButton === 'pace' ? 'bg-green-400' : 'bg-white'}`} onClick={()=> onClickButton('pace')}>
                <span>평균 페이스 </span>
                <span>{avgPace}</span>
            </Button>
            <Button className={`grow-1 border p-4 border-gray-200 rounded-md hover:bg-green-400 ${clickedButton === 'cadence' ? 'bg-green-400' : 'bg-white'}`} onClick={()=> onClickButton('cadence')}>
                케이던스
            </Button>
        </div>
        <LineGraph data={dummyPace} xKey={'cumulativeDistanceKm'} yKey={'instantPaceFormatted'} width={800} height={400} marginLeft={40} setAvg={setAvgPace} setHoveredSegmentId={setHoveredSegmentId}/>
    </>
  )
}
