'use client';
import Script from 'next/script';
import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';


export interface KakaoMapHandle {
   getMap: () => any;
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

const KakaoMap = forwardRef<KakaoMapHandle,KakaoMapProps>(({className,mapId , level , latitude , longitude , dummyPath, hoveredSegmentId}, ref) => {
  const map = useRef(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const [statePolyline,setStatePolyline] = useState([]);     
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
        if(dummyPath && dummyPath.length > 1){
          // 기존 폴리라인들 제거
          statePolyline.forEach(({polyline}) => {
            polyline.setMap(null);
          });
          setStatePolyline([])

          // 각 세그먼트별로 폴리라인 생성
          for(let i = 0; i < dummyPath.length - 1; i++) {
            const startPoint = dummyPath[i];
            const endPoint = dummyPath[i + 1];
            
            const polyline = new window.kakao.maps.Polyline({
              map : map.current,
              path : [
                new window.kakao.maps.LatLng(startPoint.latitude, startPoint.longitude),
                new window.kakao.maps.LatLng(endPoint.latitude, endPoint.longitude)
              ],
              strokeWeight: 2,
              strokeColor: '#FF00FF',
              strokeOpacity: 0.8,
              strokeStyle: 'solid'
            });
            
            polyline.setMap(map.current);
            
            // 폴리라인과 세그먼트 ID를 함께 저장
            setStatePolyline(prevPolylines => [...prevPolylines, {polyline : polyline , segmentId : endPoint.id}]);
          }
        }
     })
  }, [dummyPath, latitude, level, longitude])


   useEffect(() => {
    if (hoveredSegmentId && statePolyline) {
    statePolyline.forEach(({polyline, segmentId }) => {
      if (segmentId === hoveredSegmentId) { // 조건이 더 단순해졌습니다.
        console.log(polyline ,'polyline')
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