import { create } from "zustand";

interface RunningState {
    runningGoal : number | null;
    isTracking : boolean;
    setRunningGoal : (value : number | null) => void;
    setTracking : (value : boolean) => void;
    step : 0 | 1,
    setStep : (value : 0 | 1) => void;
}

export const useRunningStore = create<RunningState>((set) => ({
    runningGoal : 0,
    isTracking : false,
    step : 0,
    setRunningGoal: (value) => set({runningGoal : value }),
    setTracking : (value) => set({isTracking : value}),
    setStep: (value)=> set({step: value}) 
}))