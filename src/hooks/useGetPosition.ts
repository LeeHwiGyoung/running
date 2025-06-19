'use client';
import { Coordinate } from '../types/type';
import { useEffect, useRef, useState } from "react";


export default function useGetPosition() {
  const [position , setPosition] = useState<Coordinate>({
    longitude : null,
    latitude : null
  });
  const [error , setError] = useState<string|null>(null);
  const watchId = useRef<number|null>(null);

  useEffect(()=> {
    if(navigator.geolocation){
        watchId.current = navigator.geolocation.watchPosition(
            (pos)=> {
            setPosition({
                longitude: pos.coords.longitude,
                latitude: pos.coords.latitude,
            });
            setError(null)
        },
        (error) => {
            setError(error.message);
        }, {
            enableHighAccuracy : true,
            maximumAge : 0,
            timeout : 5000,
        })
    }else {
    setError('Geolocation을 지원하지 않는 브라우저입니다.')
    } 
    return () => {
        if(watchId.current) {
            navigator.geolocation.clearWatch(watchId.current);
        }
    }
  }, [])
  return { position , error}
}
