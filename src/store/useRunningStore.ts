import { calculateDistance, calculatePace } from '@/utils/calculate';
import { PathPoint } from "@/types/running.types";
import { create } from "zustand";
import { Coordinate } from '@/types/type';

interface RunningState {
    //러닝 준비 페이지
    runningGoal : number | null; //목표 거리
    
    //러닝 측정 페이지
    step : 0 | 1 , //0 : 카운트 다운 컴포넌트 , 1: 러닝 기록 측정
    isTracking : boolean; //현재 러닝이 진행 중인지 여부
    isRunningPaused : boolean; // 러닝이 일시 정지 상태인지 여부
    path : PathPoint[][]; //path 별 curPace 와 누적 Distance 저장 
    totalDistance : number; // 누적 거리
    totalTime : number; // 누적 시간
    runningStartTime : number | null; //ms 
    runningEndTime : number | null; //ms 
    averagePace : number | null;
    currentPace : number | null;

    //내부 관리용
    runningSessionIndex : number;
    currentPathSegment : PathPoint[];
    error : string | null;
}

interface RunningActions {
    //러닝 준비 페이지
    setRunningGoal : (value : number | null) => void;
    //러닝 측정 페이지
    setStep : (value : 0 | 1) => void;
    setIsTracking : (value : boolean) => void;
    setIsRunningPaused : (value : boolean) => void;

    startTraking : () => void;
    pauseTracking : () => void;
    resumeTracking : () => void;
    stopTracking : () => void;


    //useRunningTracking 에서 호출될 액션들
    updateStats : (newPoint : Coordinate) => void;
    incrementTime : () => void; // 시간 1초 증가
    resetRunningStat : () => void;
    setError : (error : string) => void;
}
//스토어 생성
export const useRunningStore = create<RunningState & RunningActions>((set , get) => ({
    // 초기 상태
    runningGoal : null,
    step: 0,
    isTracking : false,
    isRunningPaused : false ,
    
    path : [],
    totalDistance : 0,
    totalTime : 0,
    runningStartTime : null,
    runningEndTime : null,
    averagePace : null,
    currentPace : null,
    runningSessionIndex : 0,
    currentPathSegment : [],

    error : null,
    //actions
    setRunningGoal: (value) => set({runningGoal : value }),
    setStep: (value)=> set({step: value}),
    setIsTracking : (value) => set({isTracking : value}),
    setIsRunningPaused : (value) => set({isRunningPaused: value}),
    setError : (value) => set({error: value}),

    startTraking : () => { //처음 시작할 때
        const newSessionIndex = get().path.length;
        set({
            isTracking : true,
            isRunningPaused : false,
            step : 1,
            runningSessionIndex: newSessionIndex,
            totalDistance : 0,
            totalTime : 0,
            averagePace : null,
            currentPace : null,
            runningStartTime : Date.now(),
            runningEndTime : null,
            currentPathSegment : [],
        });
        console.log('running start')
    },

    pauseTracking : () => {
        set(state => {
            const newPath = [...state.path]
            if(state. currentPathSegment.length > 0){
                if (!newPath[state.runningSessionIndex]) {
                    newPath[state.runningSessionIndex] = [];
                }
                // 스프레드 연산자를 사용하여 불변성을 유지하며 요소들을 추가합니다.
                newPath[state.runningSessionIndex] = [...newPath[state.runningSessionIndex], ...state.currentPathSegment];
            }
            
            return {
                isRunningPaused : true,
                path : newPath,
                currentPathSegment : [],
            }
        })
     console.log('러닝 측정 일시 중지')  
    },

    resumeTracking : () => {
        const state = get();
        const newSessionIndex = state.path.length;
        set({
            ...state,
            step : 0, // countdown 
            isRunningPaused : false,
            runningSessionIndex : newSessionIndex,
            currentPathSegment : [],
        });
        console.log('러닝 재개됨')
    },

    stopTracking : () => { //종료 버튼을 눌렀을 때
        const currentEndTime = Date.now();
        set(state => {
            const newPath = [...state.path]
            if(state. currentPathSegment.length > 0){
                if (!newPath[state.runningSessionIndex]) {
                    newPath[state.runningSessionIndex] = [];
                }
                // 스프레드 연산자를 사용하여 불변성을 유지하며 요소들을 추가합니다.
                newPath[state.runningSessionIndex] = [...newPath[state.runningSessionIndex], ...state.currentPathSegment];
            }
            
            return {
                isTracking : false,
                isRunningPaused : false,
                path : newPath,
                currentPathSegment : [],
                runningEndTime : currentEndTime,
            }
        })
        console.log('러닝 종료됨')
    },
   
    updateStats : (newUserPosition : Coordinate) => {
        set(state => {
            const lastPoint = state.currentPathSegment.length > 0 ? state.currentPathSegment[state.currentPathSegment.length - 1] : null;
            let segementDistance = 0;
            let timeDiffseconds = 0;
            let calculatedCurrentPace:number|null = null;
            const newUserPositionTimeStamp = Date.now();
            if(lastPoint){
                segementDistance = calculateDistance(
                    {latitude : lastPoint.latitude, longitude : lastPoint.longitude},
                    {latitude : newUserPosition.latitude , longitude : newUserPosition.longitude}
                );
                timeDiffseconds = (newUserPositionTimeStamp - lastPoint.timestamp) / 1000;

                if(segementDistance > 0 && timeDiffseconds > 0) {
                    calculatedCurrentPace = calculatePace(segementDistance , timeDiffseconds)
                }
            }

            const updateTotalDistance = state.totalDistance + segementDistance;
            const updatePoint : PathPoint = {
                ...newUserPosition,
                curDistance : updateTotalDistance,
                curPace : calculatedCurrentPace,
                timestamp : newUserPositionTimeStamp,
            }

            const newCurrentPathSegment = [...state.currentPathSegment , updatePoint];
            
            return  {
                totalDistance : updateTotalDistance,
                currentPathSegment : newCurrentPathSegment,
            }
        })

        //segment 가 업데이트 된 후
        const state = get();
        const newAvgPace = calculatePace(state.totalDistance , state.totalTime);
        const newCurPace = state.currentPathSegment.length > 0 ? state.currentPathSegment[state.currentPathSegment.length - 1].curPace : null
        
        set({
            currentPace : newCurPace,
            averagePace : newAvgPace,
        })
    },

    incrementTime : () => {    // 시간 1초 증가
        set(state => ({totalTime : state.totalTime + 1}));
    },
  
    resetRunningStat : () => {
        console.log("Running session state reset.");
        set({
            runningGoal: null,
            step: 0,
            isTracking: false,
            isRunningPaused: false,
            path: [],
            totalDistance: 0,
            totalTime: 0,
            currentPace: null,
            averagePace: null,
            runningSessionIndex: 0,
            runningStartTime: null,
            runningEndTime: null,
            currentPathSegment: [],
        });
    },
}));

    

  
