'use client';
import Script from 'next/script';
import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from 'react';


export interface KakaoMapHandle 
{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
   getMap: () => any;
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   getKaKaoInstance: () => any;
}

interface KakaoMapProps {
  className ?: string;
  mapId : string;
  latitude : number,
  longitude : number,
  level : number,
  dummyPath ?: {
    id : number;
    latitude: number;
    longitude: number;
  }[],
  hoveredSegmentId ?: number|null;
}

const KakaoMap = forwardRef<KakaoMapHandle,KakaoMapProps>(({className,mapId , level , latitude , longitude }, ref) => {
  const map = useRef(null);
  const mapRef = useRef<HTMLDivElement>(null);
     
  useImperativeHandle(ref, () => ({
    getMap: () => map.current, // 외부에서 지도를 얻을 수 있는 메서드 제공
    getKaKaoInstance : () => window.kakao,
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
        
        
     })
  }, [latitude, level, longitude])


   /* useEffect(() => {
    if (hoveredSegmentId && statePolyline) {
    statePolyline.forEach(({polyline, segmentId }) => {
      if (segmentId === hoveredSegmentId) { // 조건이 더 단순해졌습니다.
        polyline.setOptions({
          strokeColor : '#000000'
        });
      }
    });
  } else {
    statePolyline.forEach(({ polyline }) => {
      polyline.setOptions({
        strokeWeight: 2,
        strokeColor: '#FF00FF',
        strokeOpacity: 0.8
      });
    });
  }
  }, [hoveredSegmentId, statePolyline]);
 */
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
      <div ref={mapRef} id={mapId} className={className}/>
    </>
  )
})

KakaoMap.displayName = 'kakaoMap';
export default KakaoMap;