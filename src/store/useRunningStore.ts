import { create } from "zustand";

interface RunningState {
    runningGoal : number;
    isTracking : boolean;
    setRunningGoal : (value : number) => void;
    setTracking : (value : boolean) => void;
}

export const useRunningStore = create<RunningState>((set) => ({
    runningGoal : 0,
    isTracking : false,
    setRunningGoal: (value) => set({runningGoal : value }),
    setTracking : (value) => set({isTracking : value})

}))