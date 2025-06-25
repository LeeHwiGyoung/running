import { PathPoint, RunningSummaryForSave } from "./running.types";

export interface SaveRunningResultRequestBody {
    runData : RunningSummaryForSave;
    pathPoints : PathPoint[];
}