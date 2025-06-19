'use client';
import { useRunningStore } from "@/store/useRunningStore";

interface RunningGoalInputProps {
  className ?: string
}

export default function RunningGoalInput( {className} : RunningGoalInputProps) {
  const {runningGoal , setRunningGoal} = useRunningStore();  
  const maxValue = 100;


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
         value={runningGoal ?? ''}
         max={maxValue}
         onChange={onChangeGoal} />
    </div>
  )
}
