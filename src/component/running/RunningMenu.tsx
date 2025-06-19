'use client';
import React from 'react'
import Button from '../ui/Button'
import { useRunningStore } from '@/store/useRunningStore';
import { useRouter } from 'next/navigation';

interface RunningMenuProps {
  className?: string;
}
export default function RunningMenu( {className} : RunningMenuProps) {
  const router = useRouter();
  const {runningGoal} = useRunningStore()
  
  const onClickRunningStart = () => {
    if(runningGoal === 0) {
      return; 
    }
    router.push('/tracking');
  }

  return (
    <section className={className}>
        <h3 className='sr-only'>러닝 메뉴</h3>
        <Button className='border rounded-full px-20 py-4 z-10 bg-black text-white hover:bg-gray-700 active:bg-gray-500' onClick={onClickRunningStart}>
           start
        </Button>
    </section>
  )
}
