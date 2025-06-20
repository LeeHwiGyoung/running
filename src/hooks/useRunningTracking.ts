import { UserPosition } from '@/types/type'
import { calculateDistance, calculatePace } from '@/utils/calculate';
import { useEffect, useRef, useState } from 'react'
interface useRunningTrackingProps {
  isRunning : boolean;
}

export default function useRunningTracking({isRunning}:useRunningTrackingProps) {
  const [path ,setPath] = useState<UserPosition[]>([]);
  const [distance , setDistance] = useState<number>(0);
  const [time , setTime] = useState<number>(0);
  const [curPace ,setCurPace] = useState<number|null>(null);
  const [avgPace ,setAvgPace] = useState<number|null>(null);
  //const [cadence , setCadence] = useState<number>(0);
  const [error , setError] = useState<string|null>(null);
  const prevPositionRef = useRef<UserPosition|null>(null);
  const watchId = useRef<number|null>(null);
  const intervalId = useRef(null);
   
  //interval 이 1초 지날 때 마다 실행되는 함수로 time을 1증가 시키고 현재 위치를 저장하는 역할
  const timerCallback = () => {
    setTime((prevTime) => {
      const newTime = prevTime + 1
      if(prevPositionRef.current) {
        const newCurrentPosition = prevPositionRef.current;

        setPath((prevPath) => {
          const updatePath = [...prevPath, newCurrentPosition];
          let currentSegmentDistance = 0;
          if(prevPath.length > 0) {
            const lastRecordedPosition = prevPath[prevPath.length - 1];
            currentSegmentDistance = calculateDistance({ latitude: lastRecordedPosition.latitude, longitude: lastRecordedPosition.longitude },{ latitude: newCurrentPosition.latitude, longitude: newCurrentPosition.longitude })
          }

          setDistance((prevDistance) => {
            const newTotalDistance = prevDistance + currentSegmentDistance;
            const currentPaceValue = calculatePace(currentSegmentDistance , 1);
            const averagePaceValue = calculatePace(newTotalDistance , newTime);

            setCurPace(currentPaceValue);
            setAvgPace(averagePaceValue)

            return newTotalDistance;
          });
          return updatePath;
        });
      }
      return newTime;
    });
  }


  useEffect(()=> {
    if(navigator.geolocation) {
      watchId.current = navigator.geolocation.watchPosition((position)=> {
        prevPositionRef.current = { //현재 위치를 기록하고 있는 ref
          latitude : position.coords.latitude,
          longitude: position.coords.longitude,
          timestamp : position.timestamp
        }
      } , (err) => {
        setError(err.message)
      }, {
         enableHighAccuracy : false,
         maximumAge : 0,
         timeout : 1000,
      })
    }
  })


  useEffect(()=> { // 타임 계산
    if(!isRunning) return; // 러닝 중이 아니라면
    intervalId.current = setInterval(timerCallback, 1000);

    return () => {
      clearInterval(intervalId.current)
    }
  }, [isRunning])  

  return {path ,curPace , avgPace , distance , time , error }
}


