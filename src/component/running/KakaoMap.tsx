'use client';
import useGetPosition from '@/hooks/useGetPosition';
import Script from 'next/script';
import React, {useEffect, useRef } from 'react';
//import markerImage from '@/assets/currentMarker.svg'
interface KaKaoMapProps {
  className ?: string;
}

export default function KaKaoMap({className} : KaKaoMapProps) {
  const {position , error} = useGetPosition();
  const mapMarker = useRef(null);
  const map = useRef(null);
  const mapRef = useRef<HTMLDivElement>(null);
     
  const handleMapLoad = () => {
     if(!window.kakao.maps || !mapRef.current) return;
     window.kakao.maps.load(()=> {
        const options = {
            center : new window.kakao.maps.LatLng(position.latitude, position.longitude),
            level : 3,
            draggable  : false,
            scrollwheel : false,
            disableDoubleClick : true,
            disableDoubleClickZoom  : true,
        }
        map.current = new window.kakao.maps.Map(mapRef.current, options)
     })
  }
  
  useEffect(()=> {
    if(map.current){
      const newPos = new window.kakao.maps.LatLng(position.latitude, position.longitude)
      map.current.setCenter(newPos)
      mapMarker.current = new window.kakao.maps.Marker({position  : newPos });
      mapMarker.current.setMap(map.current)
    }
    return ()=> {
      if(map.current && mapMarker.current){
        mapMarker.current.setMap(null);
      }
    }
  }, [position])

  if(error) {
    console.error(error)
  }
  
  return (
    <>
      <Script
          src={process.env.NEXT_PUBLIC_KAKAO_MAP_API}
          strategy='afterInteractive'
          onLoad={()=> handleMapLoad()}
      />
      <div ref={mapRef} id="map" className={className}/>
    </>
  )
}
