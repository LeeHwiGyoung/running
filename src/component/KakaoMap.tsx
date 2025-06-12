'use client';
import Script from 'next/script';
import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from 'react';
//import markerImage from '@/assets/currentMarker.svg'

export interface KakaoMapHandle {
   getMap: () => any;
   getKaKaoInstance : () => any;
}

interface KakaoMapProps {
  className ?: string;
  latitude : number,
  longitude : number,
  level : number,
  dummyPath ?: {
    latitude: number;
    longitude: number;
    timestamp: number;
  }[],
}

const KakaoMap = forwardRef<KakaoMapHandle,KakaoMapProps>(({className , level , latitude , longitude , dummyPath}, ref) => {
  const map = useRef(null);
  const mapRef = useRef<HTMLDivElement>(null);
     
  useImperativeHandle(ref, () => ({
    getMap: () => map.current, // 외부에서 지도를 얻을 수 있는 메서드 제공
    getKaKaoInstance : () => window.kakao
  }));

  const initializeMap = useCallback(()=> {
     if(!window.kakao.maps || !mapRef.current) return;
     window.kakao.maps.load(()=> {
        const options = {
            center : new window.kakao.maps.LatLng(latitude, longitude),
            level : level,
            draggable  : false,
            scrollwheel : false,
            disableDoubleClick : true,
            disableDoubleClickZoom  : true,
        }
        map.current = new window.kakao.maps.Map(mapRef.current, options)
        if(dummyPath){
          const polyline = new window.kakao.maps.Polyline({
            map : map.current,
            path : dummyPath.map((pathData)=> new window.kakao.maps.LatLng(pathData.latitude, pathData.longitude)),
            strokeWeight: 2,
            strokeColor: '#FF00FF',
            strokeOpacity: 0.8,
            strokeStyle: 'stroke'
          })
          polyline.setMap(map.current)
        }
     })
  }, [dummyPath, latitude, level, longitude])


   useEffect(() => {
    // 이미 kakao API가 로드되어 있는 경우 바로 초기화
    if (window.kakao?.maps) {
      initializeMap();
    }
  }, [initializeMap]);
  return (
    <>
      <Script
          src={process.env.NEXT_PUBLIC_KAKAO_MAP_API}
          strategy='afterInteractive'
          onLoad={()=> initializeMap()}
      />
      <div ref={mapRef} id="map" className={className}/>
    </>
  )
})

KakaoMap.displayName = 'kakaoMap';
export default KakaoMap;