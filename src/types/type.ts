export type Coordinate = {
    latitude : number;
    longitude : number;
}

export type UserPosition = Coordinate & {
    timestamp : number;
}

export type CarouselData = {
    value : number | string | null,
    label : string;
}