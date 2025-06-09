'use client';

import { useState } from "react";

interface RunningGoalInputProps {
  className ?: string
}
export default function RunningGoalInput( {className} : RunningGoalInputProps) {
  const [goal, setGoal] = useState<number>(0);

  const onChangeGoal = (event : React.ChangeEvent<HTMLInputElement>) => {
    const newGoal = event.target.value; 
    if(newGoal === "") return
    setGoal(parseInt(newGoal)); 
  }

  return (
    <div className={className}>
        <label htmlFor="runningGoal" className="sr-only" >
          목표 거리  
        </label>  
        <input 
         className="w-full py-4 border-b outline-none text-2xl font-bold text-center"
         id='runningGoal'
         type="number"
         name='runningGoal'
         placeholder={'0'}
         value={goal}
         onChange={onChangeGoal} />
    </div>
  )
}
