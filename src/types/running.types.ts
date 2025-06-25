export interface RunningSummaryForSave {
    runTitle : string;
    date : string;
    startTime : number;
    endTime :number;
    totalDistance : number;
    totalRunningTimeSecond : number;
    avgPace : number;
    centerMapLat : number;
    centerMapLng : number;
    dayOfWeek : string;
}

export interface PathPoint {
    latitude : number;
    longitude : number;
    timestamp : number; //ms
    curPace : null | number; //sec
    curDistance : number;
}