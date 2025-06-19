import { Coordinate, UserPosition } from '@/types/type'
import { calculateDistance } from '@/utils/calculateDistance';
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
  
  useEffect(() => {
    if(navigator.geolocation){
      watchId.current = navigator.geolocation.watchPosition((pos)=> {
        const {latitude , longitude} = pos.coords;
        const timestamp = pos.timestamp;
        const current = {latitude , longitude , timestamp};
        setPath((prevPath)=> [...prevPath , current]);

        if(prevPositionRef.current) { //거리 계산 이전 거리가 있으면
          const segmentDistance = calculateDistance(prevPositionRef.current , current);
          setDistance((prevDistance) => prevDistance + segmentDistance);
        }
        prevPositionRef.current = current;
      },
        (error) => {
            setError(error.message);
        },
        {
            enableHighAccuracy : true,
            maximumAge : 0,
            timeout : 5000,
        })
    }

    return () => {
      if (watchId.current !== null) {
        navigator.geolocation.clearWatch(watchId.current);
      }
    }
  }, [])

  useEffect(()=> { // 타임 계산
    if(!isRunning) return; // 러닝 중이 아니라면
    intervalId.current = setInterval(()=> {
      setTime((prevTime) => {
        return prevTime + 1
      })
    } ,1000);

    return () => {
      clearInterval(intervalId.current)
    }
  }, [isRunning])  
  
  useEffect(() => { //pace 계산
    if(distance > 0 && time > 0){
      const avgPaceValue = time / distance;
      setAvgPace(avgPaceValue);

      if(path.length >= 2) { //최근 2개 지점을 대상으로 
        const lastTwoPoints = path.slice(-2);
        const {latitude : lastLatitude ,  longitude : lastLongitude, timestamp:lastTime} = lastTwoPoints[0];
        const {latitude : curLatitude ,  longitude : curLongitude, timestamp:curTime} = lastTwoPoints[1];
        const lastCoords:Coordinate = {latitude : lastLatitude ,longitude : lastLongitude}
        const curCoords: Coordinate = {latitude :curLatitude , longitude : curLongitude}
        const segmentTime = (lastTime - curTime) / 1000
        const segmentDistance = calculateDistance(lastCoords, curCoords);
        if (segmentDistance > 0 && segmentTime > 0) {
          const currentPace = segmentTime / segmentDistance; 
          setCurPace(currentPace);
        } else {
          // 거리가 0이거나 시간이 0이면 페이스 계산 불가
          setCurPace(null);
        }
      }
    }
  }, [distance, path, time])
  return {curPace , avgPace , distance , time , error }
}


