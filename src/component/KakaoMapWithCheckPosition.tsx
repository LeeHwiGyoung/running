'use client';
import useGetPosition from '@/hooks/useGetPosition';
import React, {useEffect, useRef } from 'react';
import KakaoMap, { KakaoMapHandle } from './KakaoMap';
//import markerImage from '@/assets/currentMarker.svg'
interface KaKaoMapProps {
  className ?: string;
}

export default function KaKaoMapWithCheckPosition({className} : KaKaoMapProps) {
  const {position , error} = useGetPosition();
  const kakaoMapRef = useRef<KakaoMapHandle>(null);
  
  useEffect(() => {
    const kakao = kakaoMapRef.current.getKaKaoInstance();
    const map = kakaoMapRef.current.getMap();
    if(kakao && map) {
      const newPos = new window.kakao.maps.LatLng(position.latitude, position.longitude);
      new window.kakao.maps.Marker({
        map : map,
        position : newPos
      });
      map.setCenter(newPos)
    }
  }, [position])

  return (
    <>
      <KakaoMap ref={kakaoMapRef} className={className} latitude={position.latitude} longitude={position.longitude} level={3} />
    </>
  )
}
