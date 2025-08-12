export interface RunningData {
    id : number | string;
    runTitle : string;
    date : string;
    startTime : number;
    endTime :number;
    totalDistance : number;
    totalRunningTimeSecond : number;
    avgPace : number;
    dayOfWeek : string;
    userRunCount: number;
}

export interface RunningSummaryForSave {
    runTitle : string;
    date : string;
    startTime : number;
    endTime :number;
    totalDistance : number;
    totalRunningTimeSecond : number;
    avgPace : number;
    dayOfWeek : string;
}

export interface PathPoint {
    latitude : number;
    longitude : number;
    timestamp : number; //ms
    curPace : null | number; //sec
    curDistance : number;
}

export interface TotalRun {
  day: string;
  runCount: number;
  distance: number;
  time: number;
}