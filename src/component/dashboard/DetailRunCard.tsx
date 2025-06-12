'use client';
import { formatPace, formatTime } from '@/utils/format'
import React from 'react'
import KakaoMap from '../KakaoMap'
import useCountUp from '@/hooks/useCountUp'
import Button from '../ui/Button';
import useModal from '@/hooks/useModal';
import Modal from '../Modal';

interface DetailRunCardProps {
    date: string,
    title : string,
    distance : number,
    distanceLabel : string,
    runningPace : number,
    runningTime : number,
    cadence : number,
}

const dummyPath = [
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
]

const dummyPace = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          126.685514,
          37.4504924,
          0
        ]
      },
      "properties": {
        "id": 0,
        "timestamp": "2024-06-10T07:00:00.000Z",
        "elapsedTimeSeconds": 0,
        "distanceFromPrevKm": 0,
        "cumulativeDistanceKm": 0,
        "instantPaceSecondsPerKm": 0,
        "instantPaceFormatted": "0:00",
        "averagePaceSecondsPerKm": 0,
        "averagePaceFormatted": "0:00"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          126.6854992,
          37.450614,
          0
        ]
      },
      "properties": {
        "id": 1,
        "timestamp": "2024-06-10T07:00:02.500Z",
        "elapsedTimeSeconds": 2.5,
        "distanceFromPrevKm": 0.0135,
        "cumulativeDistanceKm": 0.0135,
        "instantPaceSecondsPerKm": 185.19,
        "instantPaceFormatted": "3:05",
        "averagePaceSecondsPerKm": 185.19,
        "averagePaceFormatted": "3:05"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          126.6853755,
          37.4507024,
          0
        ]
      },
      "properties": {
        "id": 2,
        "timestamp": "2024-06-10T07:00:05.000Z",
        "elapsedTimeSeconds": 5,
        "distanceFromPrevKm": 0.0138,
        "cumulativeDistanceKm": 0.0273,
        "instantPaceSecondsPerKm": 181.16,
        "instantPaceFormatted": "3:01",
        "averagePaceSecondsPerKm": 183.15,
        "averagePaceFormatted": "3:03"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          126.6851608,
          37.4507502,
          0
        ]
      },
      "properties": {
        "id": 3,
        "timestamp": "2024-06-10T07:00:07.500Z",
        "elapsedTimeSeconds": 7.5,
        "distanceFromPrevKm": 0.0189,
        "cumulativeDistanceKm": 0.0462,
        "instantPaceSecondsPerKm": 132.28,
        "instantPaceFormatted": "2:12",
        "averagePaceSecondsPerKm": 162.34,
        "averagePaceFormatted": "2:42"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          126.6849254,
          37.4507567,
          0
        ]
      },
      "properties": {
        "id": 4,
        "timestamp": "2024-06-10T07:00:10.000Z",
        "elapsedTimeSeconds": 10,
        "distanceFromPrevKm": 0.0202,
        "cumulativeDistanceKm": 0.0664,
        "instantPaceSecondsPerKm": 123.76,
        "instantPaceFormatted": "2:04",
        "averagePaceSecondsPerKm": 150.60,
        "averagePaceFormatted": "2:30"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          126.684689,
          37.4507198,
          0
        ]
      },
      "properties": {
        "id": 5,
        "timestamp": "2024-06-10T07:00:12.500Z",
        "elapsedTimeSeconds": 12.5,
        "distanceFromPrevKm": 0.0207,
        "cumulativeDistanceKm": 0.0871,
        "instantPaceSecondsPerKm": 120.77,
        "instantPaceFormatted": "2:01",
        "averagePaceSecondsPerKm": 143.51,
        "averagePaceFormatted": "2:23"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          126.6844744,
          37.4506385,
          0
        ]
      },
      "properties": {
        "id": 6,
        "timestamp": "2024-06-10T07:00:15.000Z",
        "elapsedTimeSeconds": 15,
        "distanceFromPrevKm": 0.0203,
        "cumulativeDistanceKm": 0.1074,
        "instantPaceSecondsPerKm": 123.15,
        "instantPaceFormatted": "2:03",
        "averagePaceSecondsPerKm": 139.66,
        "averagePaceFormatted": "2:19"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          126.6843507,
          37.4505168,
          0
        ]
      },
      "properties": {
        "id": 7,
        "timestamp": "2024-06-10T07:00:17.500Z",
        "elapsedTimeSeconds": 17.5,
        "distanceFromPrevKm": 0.0152,
        "cumulativeDistanceKm": 0.1226,
        "instantPaceSecondsPerKm": 164.47,
        "instantPaceFormatted": "2:44",
        "averagePaceSecondsPerKm": 142.74,
        "averagePaceFormatted": "2:22"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          126.6842797,
          37.4504284,
          0
        ]
      },
      "properties": {
        "id": 8,
        "timestamp": "2024-06-10T07:00:20.000Z",
        "elapsedTimeSeconds": 20,
        "distanceFromPrevKm": 0.0108,
        "cumulativeDistanceKm": 0.1334,
        "instantPaceSecondsPerKm": 231.48,
        "instantPaceFormatted": "3:51",
        "averagePaceSecondsPerKm": 149.93,
        "averagePaceFormatted": "2:29"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          126.684144,
          37.4503806,
          0
        ]
      },
      "properties": {
        "id": 9,
        "timestamp": "2024-06-10T07:00:22.500Z",
        "elapsedTimeSeconds": 22.5,
        "distanceFromPrevKm": 0.0118,
        "cumulativeDistanceKm": 0.1452,
        "instantPaceSecondsPerKm": 211.86,
        "instantPaceFormatted": "3:31",
        "averagePaceSecondsPerKm": 155.09,
        "averagePaceFormatted": "2:35"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          126.6839086,
          37.4503741,
          0
        ]
      },
      "properties": {
        "id": 10,
        "timestamp": "2024-06-10T07:00:25.000Z",
        "elapsedTimeSeconds": 25,
        "distanceFromPrevKm": 0.0202,
        "cumulativeDistanceKm": 0.1654,
        "instantPaceSecondsPerKm": 123.76,
        "instantPaceFormatted": "2:04",
        "averagePaceSecondsPerKm": 151.15,
        "averagePaceFormatted": "2:31"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          126.6836722,
          37.450411,
          0
        ]
      },
      "properties": {
        "id": 11,
        "timestamp": "2024-06-10T07:00:27.500Z",
        "distanceFromPrevKm": 0.0207,
        "cumulativeDistanceKm": 0.1861,
        "instantPaceSecondsPerKm": 120.77,
        "instantPaceFormatted": "2:01",
        "averagePaceSecondsPerKm": 134.44,
        "averagePaceFormatted": "2:14"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          126.6835,
          37.4504924,
          0
        ]
      },
      "properties": {
        "id": 12,
        "timestamp": "2024-06-10T07:00:30.000Z",
        "elapsedTimeSeconds": 30,
        "distanceFromPrevKm": 0.0197,
        "cumulativeDistanceKm": 0.2058,
        "instantPaceSecondsPerKm": 126.90,
        "instantPaceFormatted": "2:06",
        "averagePaceSecondsPerKm": 145.77,
        "averagePaceFormatted": "2:25"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          126.6835148,
          37.4503708,
          0
        ]
      },
      "properties": {
        "id": 13,
        "timestamp": "2024-06-10T07:00:32.500Z",
        "elapsedTimeSeconds": 32.5,
        "distanceFromPrevKm": 0.0135,
        "cumulativeDistanceKm": 0.2193,
        "instantPaceSecondsPerKm": 185.19,
        "instantPaceFormatted": "3:05",
        "averagePaceSecondsPerKm": 148.20,
        "averagePaceFormatted": "2:28"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          126.6836385,
          37.4502824,
          0
        ]
      },
      "properties": {
        "id": 14,
        "timestamp": "2024-06-10T07:00:35.000Z",
        "elapsedTimeSeconds": 35,
        "distanceFromPrevKm": 0.0138,
        "cumulativeDistanceKm": 0.2331,
        "instantPaceSecondsPerKm": 181.16,
        "instantPaceFormatted": "3:01",
        "averagePaceSecondsPerKm": 150.15,
        "averagePaceFormatted": "2:30"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          126.6838532,
          37.4502346,
          0
        ]
      },
      "properties": {
        "id": 15,
        "timestamp": "2024-06-10T07:00:37.500Z",
        "elapsedTimeSeconds": 37.5,
        "distanceFromPrevKm": 0.0189,
        "cumulativeDistanceKm": 0.2520,
        "instantPaceSecondsPerKm": 132.28,
        "instantPaceFormatted": "2:12",
        "averagePaceSecondsPerKm": 148.81,
        "averagePaceFormatted": "2:28"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          126.6840886,
          37.4502281,
          0
        ]
      },
      "properties": {
        "id": 16,
        "timestamp": "2024-06-10T07:00:40.000Z",
        "elapsedTimeSeconds": 40,
        "distanceFromPrevKm": 0.0202,
        "cumulativeDistanceKm": 0.2722,
        "instantPaceSecondsPerKm": 123.76,
        "instantPaceFormatted": "2:04",
        "averagePaceSecondsPerKm": 146.99,
        "averagePaceFormatted": "2:26"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          126.684325,
          37.450265,
          0
        ]
      },
      "properties": {
        "id": 17,
        "timestamp": "2024-06-10T07:00:42.500Z",
        "elapsedTimeSeconds": 42.5,
        "distanceFromPrevKm": 0.0207,
        "cumulativeDistanceKm": 0.2929,
        "instantPaceSecondsPerKm": 120.77,
        "instantPaceFormatted": "2:01",
        "averagePaceSecondsPerKm": 145.10,
        "averagePaceFormatted": "2:25"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          126.6845396,
          37.4503463,
          0
        ]
      },
      "properties": {
        "id": 18,
        "timestamp": "2024-06-10T07:00:45.000Z",
        "elapsedTimeSeconds": 45,
        "distanceFromPrevKm": 0.0203,
        "cumulativeDistanceKm": 0.3132,
        "instantPaceSecondsPerKm": 123.15,
        "instantPaceFormatted": "2:03",
        "averagePaceSecondsPerKm": 143.68,
        "averagePaceFormatted": "2:23"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          126.6846633,
          37.450468,
          0
        ]
      },
      "properties": {
        "id": 19,
        "timestamp": "2024-06-10T07:00:47.500Z",
        "elapsedTimeSeconds": 47.5,
        "distanceFromPrevKm": 0.0152,
        "cumulativeDistanceKm": 0.3284,
        "instantPaceSecondsPerKm": 164.47,
        "instantPaceFormatted": "2:44",
        "averagePaceSecondsPerKm": 144.64,
        "averagePaceFormatted": "2:24"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          126.6847343,
          37.4505564,
          0
        ]
      },
      "properties": {
        "id": 20,
        "timestamp": "2024-06-10T07:00:50.000Z",
        "elapsedTimeSeconds": 50,
        "distanceFromPrevKm": 0.0108,
        "cumulativeDistanceKm": 0.3392,
        "instantPaceSecondsPerKm": 231.48,
        "instantPaceFormatted": "3:51",
        "averagePaceSecondsPerKm": 147.38,
        "averagePaceFormatted": "2:27"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          126.6848699,
          37.4506042,
          0
        ]
      },
      "properties": {
        "id": 21,
        "timestamp": "2024-06-10T07:00:52.500Z",
        "elapsedTimeSeconds": 52.5,
        "distanceFromPrevKm": 0.0118,
        "cumulativeDistanceKm": 0.3510,
        "instantPaceSecondsPerKm": 211.86,
        "instantPaceFormatted": "3:31",
        "averagePaceSecondsPerKm": 149.57,
        "averagePaceFormatted": "2:29"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          126.6851053,
          37.4506107,
          0
        ]
      },
      "properties": {
        "id": 22,
        "timestamp": "2024-06-10T07:00:55.000Z",
        "elapsedTimeSeconds": 55,
        "distanceFromPrevKm": 0.0202,
        "cumulativeDistanceKm": 0.3712,
        "instantPaceSecondsPerKm": 123.76,
        "instantPaceFormatted": "2:04",
        "averagePaceSecondsPerKm": 148.16,
        "averagePaceFormatted": "2:28"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          126.6853417,
          37.4505738,
          0
        ]
      },
      "properties": {
        "id": 23,
        "timestamp": "2024-06-10T07:00:57.500Z",
        "elapsedTimeSeconds": 57.5,
        "distanceFromPrevKm": 0.0207,
        "cumulativeDistanceKm": 0.3919,
        "instantPaceSecondsPerKm": 120.77,
        "instantPaceFormatted": "2:01",
        "averagePaceSecondsPerKm": 146.69,
        "averagePaceFormatted": "2:26"
      }
    }
  ]
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
  const {isOpen , onOpen , onClose} = useModal();

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
        <section className='w-full h-[200px] rounded-xl overflow-hidden shadow-sm mt-4'>
            <KakaoMap className='w-full h-full' level={3} latitude={37.4504924} longitude={126.6849254} dummyPath={dummyPath} />
        </section>
        <Button className="border w-full py-4 rounded-full border-gray-300 mt-4" onClick={onOpen}>
            상세 경로
        </Button>
        <Modal className={'z-1000'} isOpen={isOpen} onClose={onClose}>
            <KakaoMap className='w-full h-[200px]'latitude={37.4504924} longitude={126.6849254} level={2} dummyPath={dummyPath} />
        </Modal>
    </article>
  )
}
