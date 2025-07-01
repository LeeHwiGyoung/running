import { PathPoint, RunningSummaryForSave } from "./running.types";

export interface SaveRunningResultRequestBody {
    runData : RunningSummaryForSave;
    pathPoints : PathPoint[];
}

export interface SignUpPayload {
    email : string;
    password : string;
    nickname : string;  
}

export interface LoginPayload {
    email : string;
    password : string;
}

export interface ErrorType extends Error {
    cause : "AuthenticationError" | "AuthorizationError" | "BadRequest" | "NotFoundError";
    code ?: string;
    status ?: number;
}