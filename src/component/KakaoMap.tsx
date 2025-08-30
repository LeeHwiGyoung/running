'use client';
import { Coordinate } from '@/types/type';
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
  points ?: Coordinate[];
}

const KakaoMap = forwardRef<KakaoMapHandle,KakaoMapProps>(({className="",mapId , level , latitude , longitude , points , hoveredSegmentId }, ref) => {
  const map = useRef(null);
  const mapRef = useRef<HTMLDivElement>(null);
  
  const polyline = useRef(null);
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
        if(points && points.length > 0) {  
          const pathPoints = points.map((point) => new window.kakao.maps.LatLng(point.latitude , point.longitude));
          
          const bounds = new window.kakao.maps.LatLngBounds();
          pathPoints.forEach((point) => {
            bounds.extend(point);
          })
          
          map.current.setBounds(bounds);
          const polylines = []
          for(let i = 0 ; i < pathPoints.length - 1 ; i++){
            const paths = pathPoints.slice(i , i + 2);
            polylines.push(new window.kakao.maps.Polyline({
              path : paths,
              strokeWeight: 4, // 선의 두께 입니다
              strokeColor: '#000', // 선의 색깔입니다
              strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
              strokeStyle: 'solid'
            }))
          }
          
          polyline.current = polylines
          polyline.current.forEach((line) => line.setMap(map.current))

        }
     })
  }, [latitude, level, longitude , points])

   useEffect(() => {
    if(!hoveredSegmentId && points && polyline.current) {
      polyline.current.forEach((line) => {
        line.setOptions({
          strokeColor : '#000'
        })
      })
    }
    if (hoveredSegmentId && points && polyline.current) {
      polyline.current.forEach((line ,index) => {
        if(index === hoveredSegmentId - 1){
          line.setOptions({
            strokeColor : '#B0C4DE'
          })
        }else {
          line.setOptions({
            strokeColor : "#000"
          })
        }
      })
    }
  }

  , [hoveredSegmentId, points]);
 
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