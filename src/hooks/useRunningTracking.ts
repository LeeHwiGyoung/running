import { UserPosition } from '@/types/type'
import { calculateDistance, calculatePace } from '@/utils/calculate';
import { useEffect, useRef, useState } from 'react'
interface useRunningTrackingProps {
  isRunning : boolean;
}

export default function useRunningTracking({isRunning}:useRunningTrackingProps) {
  const [path ,setPath] = useState<UserPosition[][]>([]);
  const [distance , setDistance] = useState<number>(0);
  const [time , setTime] = useState<number>(0);
  const [curPace ,setCurPace] = useState<number|null>(null);
  const [avgPace ,setAvgPace] = useState<number|null>(null);
  //const [cadence , setCadence] = useState<number>(0);
  const [error , setError] = useState<string|null>(null);
  
  const prevPositionRef = useRef<UserPosition|null>(null);
  const watchId = useRef<number|null>(null);
  const timeIntervalId = useRef(null);
  const measureIntervalId = useRef(null);
  const wasRunningRef = useRef<boolean>(false);
  const runningSessionRef = useRef<number>(0);

  const getCurrentPath = (): UserPosition[] => {
    return path[runningSessionRef.current] || [];
  };

  const measureIntervalCallback = () => {
    if(prevPositionRef.current) {
      const newCurrentPosition = prevPositionRef.current;
      setPath((prevPath) => {
        const newPaths = [...prevPath];
        if (!newPaths[runningSessionRef.current]) {
          newPaths[runningSessionRef.current] = [];
        }
        newPaths[runningSessionRef.current] = [...newPaths[runningSessionRef.current], newCurrentPosition];
        return newPaths;
      });
    }
  }

  useEffect(()=> { //러닝 시작마다 세션 추가
    if(isRunning && !wasRunningRef.current){
      const newSessionIndex = path.length;
      runningSessionRef.current = newSessionIndex;
      setPath(prev => [...prev, []]);
    }
    wasRunningRef.current = isRunning;
  },[isRunning , path.length, setPath])


  
  useEffect(()=> { // 기록 측정 interval 마다 path 가 업데이트 되는 로직
    if(!isRunning) return;
    measureIntervalId.current = setInterval(measureIntervalCallback , 5000);  //5초마다 path 추가 
    return () => {
      if (measureIntervalId.current) {
      clearInterval(measureIntervalId.current);
      }
    }
  }, [isRunning])

  useEffect(()=> { //path가 변경 될 때 마다 실행되는 useEffect
    const currentPath = getCurrentPath();
  
    if (currentPath.length < 2) {
      return;
    }
    const prev = currentPath[currentPath.length - 2];
    const current = currentPath[currentPath.length - 1];
    const timeInterval = (current.timestamp - prev.timestamp) / 1000;

    const segmentDistance = calculateDistance({ latitude: prev.latitude, longitude: prev.longitude },{ latitude: current.latitude, longitude: current.longitude });
    const curPaceValue = calculatePace(segmentDistance , timeInterval);
    const avgPaceValue = calculatePace(distance + segmentDistance , time);
    setDistance((prevDistance) => prevDistance + segmentDistance); //거리 업데이트
    setCurPace(curPaceValue) //순간 페이스 업데이트
    setAvgPace(avgPaceValue); //평균 페이스 업데이트
   }, [path]);


  useEffect(()=> {
    if (!navigator.geolocation) return;

    if(isRunning) {
      watchId.current = navigator.geolocation.watchPosition((position)=> {
        prevPositionRef.current = { //현재 위치를 기록하고 있는 ref
          latitude : position.coords.latitude,
          longitude: position.coords.longitude,
          timestamp : position.timestamp
        }
      } , (err) => {
        setError(err.message)
      }, {
         enableHighAccuracy : true,
         maximumAge : 0,
         timeout : 5000,
      })
    }

    return () => {
      // 러닝이 중지되면 위치 추적 중지
      if (watchId.current !== null) {
        navigator.geolocation.clearWatch(watchId.current);
        watchId.current = null;
      }
    };
  }, [isRunning])


  useEffect(() => { // 순수하게 타임만을 계산하는 interval
    if (!isRunning) return;
    timeIntervalId.current = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timeIntervalId.current);
  }, [isRunning]);

  return {path ,curPace , avgPace , distance , time , error }
}


