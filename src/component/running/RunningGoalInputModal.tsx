'use client';
import { useRunningStore } from "@/store/useRunningStore";
import { useEffect, useRef } from "react";
import Header from "../Header";

interface RunningGoalInputModalProps {
  className ?: string
  onClose : () => void;
}

export default function RunningGoalInputModal( {className = "" , onClose } : RunningGoalInputModalProps) {
  const inputRef = useRef<HTMLInputElement| null>(null)
  const {runningGoal , setRunningGoal} = useRunningStore();  
  const maxValue = 100;

  const handleEnter = (e:React.KeyboardEvent) => {
    if(e.key === 'Enter'){
      onClose();
    }
  }
  
  const onChangeGoal = (event : React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value; 
    if(value === '') {
      setRunningGoal(null);
      return;
    }

    const numValue = parseInt(value);
    if(Number.isNaN(numValue)){
     return; 
    }
    setRunningGoal(Math.min(numValue, maxValue));
  }

  useEffect(()=> {
    if(inputRef.current){
      inputRef.current.focus();
    }
  }, [])

  return (
    <article className={className}>
        <Header>
          <h4>러닝 목표</h4>
        </Header>
        <label htmlFor="runningGoal" className="sr-only" >
          목표 거리  
        </label>  
        <input
         ref={inputRef}
         className="absolute top-20 left-[50%] translate-[-50%] py-4 border-b outline-none text-2xl font-bold text-center"
         id='runningGoal'
         type="number"
         name='runningGoal'
         placeholder={'0'}
         value={runningGoal ?? ''}
         max={maxValue}
         onChange={onChangeGoal}
         onKeyDown={handleEnter} />
    </article>
  )
}
