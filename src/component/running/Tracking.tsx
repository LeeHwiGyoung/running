'use client';
import { formatPace, formatTime } from '@/utils/format';
import React, { useEffect } from 'react'
import Button from '../ui/Button';
import TrackingCarousel from './TrackingCarousel';
import { CarouselData } from '@/types/type';
import { useRunningStore } from '@/store/useRunningStore';
import useRunningTracking from '@/hooks/useRunningTracking';
import CountDown from '../layout/CountDown';
import { useRouter } from 'next/navigation';

export default function Tracking() {
  const router = useRouter();
  const {isTracking , setTracking , step, setStep} = useRunningStore();
  const {avgPace , curPace , distance , time } = useRunningTracking({isRunning : isTracking});
  const carouselData:CarouselData[] = [
    {
        value : distance.toFixed(2), 
        label : '킬로미터'
    },
    {
        value : formatPace(curPace), 
        label : '현재 페이스'
    },
    {
        value : formatPace(avgPace), 
        label : '평균 페이스'
    },
    {
        value : 0, 
        label : '케이던스'
    },
    {
        value : formatTime(time), 
        label : '달린 시간'
    }
  ]

  const onClickPauseBtn = () => {
    setTracking(false)
  } 
  
  const onClickStopBtn = () => {
    setTracking(false);
    router.push('/');
  }

  const onClickStartBtn = () => {
    setStep(0);
  }

  useEffect(()=> {
    return ()=> {
        setStep(0);
    }
  }, [])

  return ( 
    <>
    {step === 0 && <CountDown />}
    {step === 1 && 
    <article className='py-4'>
        <h2 className='sr-only'>현재 러닝</h2>
        <section className='flex font-bold'>
            <h3 className='sr-only'>러닝 개요</h3>
            <div className='grow-1 flex flex-col items-center justify-center'>
                <p>{formatPace(curPace)}</p>
                <span className='font-normal text-gray-400'>현재 페이스</span>
            </div>
            <div className='grow-1 flex flex-col items-center justify-center'>
                <p>{0}</p>
                <span className='font-normal text-gray-400'>케이던스</span>
            </div>
            <div className='grow-1 flex flex-col items-center justify-center'>
                <p>{formatPace(avgPace)}</p>
                <span className='font-normal text-gray-400'>평균 페이스</span>
            </div>
        </section>
        <section className='flex items-center justify-center h-[60dvh]'>
            <h3 className='sr-only'>측정 기록</h3>
            <TrackingCarousel className="flex flex-col text-center text-7xl" data={carouselData}/>
        </section>
        <section className='flex items-center justify-center mb-12'>
            <h3 className='sr-only'>측정 메뉴</h3>
            { isTracking ?
                <div>
                    <Button className='bg-black p-8 rounded-full text-white' onClick={onClickPauseBtn}>
                        중지
                    </Button>
                </div> 
                : 
                <div className='flex gap-4'>
                    <Button className='bg-black p-8 rounded-full text-white' onClick={onClickStopBtn}>
                        정지
                    </Button>
                    <Button className='bg-black p-8 rounded-full text-white' onClick={onClickStartBtn}>
                        시작
                    </Button>
                </div>
            }
        </section>
    </article>
    }
    </>
  )
}
