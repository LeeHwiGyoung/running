import { useRunningStore } from "@/store/useRunningStore";
import { Coordinate } from "@/types/type";
import { useEffect, useRef } from "react";

export default function useRunningTracking() {
  const {
    isTracking,
    isRunningPaused,
    updateStats,
    incrementTime,
    setError,
  } = useRunningStore()
  const watchId = useRef<number|null>(null);
  const timeIntervalId = useRef(null);
  const measureIntervalId = useRef(null);
  const prevPositionRef = useRef<Coordinate|null>(null);
  
 useEffect(() => {
    //러닝 중이고 일시정지 상태가 아닐 때만 타이머 시작
    if (isTracking && !isRunningPaused) {
      if (!timeIntervalId.current) { // 이미 타이머가 돌고 있지 않다면
        timeIntervalId.current = setInterval(() => {
          incrementTime(); // Zustand 액션 호출
        }, 1000);
      }
    } else {
      //러닝이 중지되었거나, 일시정지 상태일 때 타이머 중지
      if (timeIntervalId.current) {
        clearInterval(timeIntervalId.current);
        timeIntervalId.current = null; // 정리 후 null로 설정하여 다음 시작을 준비
      }
    }

    // 클린업 함수: 컴포넌트 언마운트 또는 의존성 변경 시 인터벌 정리
    return () => {
      if (timeIntervalId.current) {
        clearInterval(timeIntervalId.current);
        timeIntervalId.current = null;
      }
    };
  }, [isTracking, isRunningPaused, incrementTime])

  useEffect(() => {
    if(isTracking&& !isRunningPaused){
      if(!measureIntervalId.current){
        measureIntervalId.current = setInterval(()=> updateStats(prevPositionRef.current), 5000);
      }
    }else {
      if(measureIntervalId.current){
        clearInterval(measureIntervalId.current);
        measureIntervalId.current = null;
      }
    }
    
    return () => {
      if(measureIntervalId.current) {
        clearInterval(measureIntervalId.current);
        measureIntervalId.current = null;
      }
    }
  }, [isRunningPaused, isTracking, updateStats])

   useEffect(()=> {
    if (!navigator.geolocation) return;
    
    if(!isRunningPaused) { //일시중지중에서도 위치는 파악하게
      watchId.current = navigator.geolocation.watchPosition((position)=> {
        prevPositionRef.current = { //현재 위치를 기록하고 있는 ref
          latitude : position.coords.latitude,
          longitude: position.coords.longitude,
        }
      } , (err) => {
        setError(err.message)
      }, {
         enableHighAccuracy : true,
         maximumAge : 0,
         timeout : 1000,
      })
    }

    return () => {
      // 러닝이 중지되면 위치 추적 중지
      if (watchId.current !== null) {
        navigator.geolocation.clearWatch(watchId.current);
        watchId.current = null;
      }
    };
  }, [isRunningPaused, setError])
}


