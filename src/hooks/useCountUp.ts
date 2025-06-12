'use client'
import { useEffect, useRef, useState } from 'react'

interface useCountUpProps {
    target : number;
    duration ?: number;
    decimalPlaces ?: number;
}
export default function useCountUp({target , duration = 1000 , decimalPlaces = 2,}:useCountUpProps){
    const [count ,setCount] = useState<number>(0);
    const frame = useRef<number>(0)

   
  useEffect(() => {
    let startTime: number | null = null
    const animate = (time: number) => {
      if (startTime === null) startTime = time

      const progress = Math.min((time - startTime) / duration, 1)
      const current =parseFloat((progress * target).toFixed(decimalPlaces))

      setCount(current)

      if (progress < 1) {
        frame.current = requestAnimationFrame(animate)
      }
    }

    frame.current = requestAnimationFrame(animate)

    return () => {
      if (frame.current) cancelAnimationFrame(frame.current)
    }
  }, [target, duration])

  return count
}
