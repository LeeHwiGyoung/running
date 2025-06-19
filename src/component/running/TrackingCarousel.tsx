import { CarouselData } from '@/types/type';
import React, { useState } from 'react'

interface TrackingCarouselProps {
    data : CarouselData[];
    className ?: string;
}

export default function TrackingCarousel({data , className}:TrackingCarouselProps) {
  const [curIndex , setCurIndex] = useState<number>(0);
  const carouselLength = data.length;
  
  const onClickCarouselItem = () => {
    setCurIndex((prevIndex) => {
        if(prevIndex >= carouselLength - 1){
            return 0;
        }
        return prevIndex + 1;
    })}

  return (
    <div className={className} onClick={onClickCarouselItem}>
        <p>{data[curIndex].value}</p>
        <span className='text-lg text-gray-400'>{data[curIndex].label}</span>
    </div>
  )
}
