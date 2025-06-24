import { useCountDown } from '@/hooks/useCountDown'
import { useRunningStore } from '@/store/useRunningStore';
import React, { useEffect } from 'react'

export default function CountDown() {
  const { setTracking , setStep} = useRunningStore();
  const {count ,startCountDown , isCountDownRuninng } = useCountDown({initCount : 3});

  useEffect(()=> {
    startCountDown();
  }, [])

  useEffect(() => {
    // 카운트다운이 끝나고 (count가 0이 되고) 더 이상 실행 중이 아닐 때만 tracking을 true로 설정합니다.
    if (count === 0 && !isCountDownRuninng) {
      setTracking(true);
      setStep(1);
    }
  }, [count, isCountDownRuninng, setTracking, setStep])
  
  return (
    <article className='flex items-center justify-center w-full h-[calc(100dvh-3rem)] bg-[#2C2C2C]'>
        <h2 className='sr-only'>카운트 다운</h2>
        <p key={count} className='absolute top-[50%] left-[50%] translate-[-50%] text-white text-6xl animate-countdown'>{count}</p>
    </article>
  )
}
