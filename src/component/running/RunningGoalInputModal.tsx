'use client';
import { useRunningStore } from "@/store/useRunningStore";
import { useEffect, useRef, useState } from "react";
import Header from "../Header";
import Button from "../Button";
import Image from "next/image";

interface RunningGoalInputModalProps {
  className ?: string
  onClose : () => void;
}

export default function RunningGoalInputModal( {className = "" , onClose } : RunningGoalInputModalProps) {
  const inputRef = useRef<HTMLInputElement| null>(null);
  const {runningGoal , setRunningGoal} = useRunningStore();  
  const [curRunningGoal, setCurRunningGoal] = useState<number>(runningGoal); 
  
  const maxValue = 100;

  const handleEnter = (e:React.KeyboardEvent) => {
    if(e.key === 'Enter'){
      onClose();
    }
  }
  
  const onClickChangeButton = () => {
    setRunningGoal(curRunningGoal);
    onClose();
  }
  
  const onChangeGoal = (event : React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value; 
    if(value === '') {
      setCurRunningGoal(null);
      return;
    }

    const numValue = parseInt(value);
    if(Number.isNaN(numValue)){
     return; 
    }
    setCurRunningGoal(Math.min(numValue, maxValue));
  }

  useEffect(()=> {
    if(inputRef.current){
      inputRef.current.focus();
    }
  }, [])

  return (
    <article className={className}>
        <Header borderBottomShadow={true} className='relative flex gap-4'>
          <Button onClick={onClose}>
            <Image src='/close.svg' width={24} height={24} alt={'닫기'} />
          </Button>  
          <h4 className='base-bottom'>러닝 목표</h4>
          <Button className="bg-black px-4 ml-auto rounded-2xl" onClick={onClickChangeButton}>
            <span className="text-white text-sm font-bold">설정</span>
          </Button>
        </Header>
       
        <div className="relative top-20 left-[50%] translate-x-[-50%] translate-y-[50%] outline-none text-2xl font-bold w-[50%] ">
          <label htmlFor="runningGoal" className="sr-only" >
            목표 거리  
          </label>  
          <input
            ref={inputRef}
            className="outline-none w-full text-center"
            id='runningGoal'
            type="number"
            name='runningGoal'
            placeholder={'0'}
            value={curRunningGoal ?? ''}
            max={maxValue}
            inputMode="decimal"
            onChange={onChangeGoal}
            onKeyDown={handleEnter} />
            <div className='w-full border after:absolute after:left-[50%] after:translate-x-[-50%] after:content-["킬로미터"] after:text-sm after:mt-1 after:font-normal'></div>
        </div>
    </article>
  )
}
