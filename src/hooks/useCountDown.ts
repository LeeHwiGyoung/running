'use client';
import { useCallback, useEffect, useRef, useState } from 'react'
interface useCountDownProps {
    initCount : number;
}

export const useCountDown = ({initCount  = 3 } : useCountDownProps) => {
    const [count , setCount] = useState<number>(initCount)
    const [isCountDownRuninng , setIsCountDownRunning] = useState<boolean>(false);
    const intervalRef = useRef(null);

    const startCountDown = useCallback(()=> {
        if(isCountDownRuninng) return;
        setCount(initCount)
        setIsCountDownRunning(true);
        
        intervalRef.current = setInterval(()=> {
            setCount(prevCount => {
                if(prevCount <= 1){
                    clearInterval(intervalRef.current!);
                    setIsCountDownRunning(false);
                    
                    return 0;
                }
                return prevCount - 1;
            })
        }, 1000)
    }, [initCount, isCountDownRuninng])

    const stopCountDown = useCallback(() => {
        if(intervalRef.current){
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        setIsCountDownRunning(false);
        setCount(initCount)
    }, [initCount])

    useEffect(()=> {
        return () => {
            if(intervalRef.current) {
                clearInterval(intervalRef.current)
            }
        }
    }, [])

    return {count , isCountDownRuninng , startCountDown , stopCountDown}
}