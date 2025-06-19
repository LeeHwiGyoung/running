import { Coordinate } from "@/types/type";

export function calculateDistance(coord1 : Coordinate ,coord2 : Coordinate) : number {
  const R = 6371e3; // 지구 반지름 (미터)
  const phi1 = coord1.latitude * Math.PI / 180;
  const phi2 = coord2.latitude * Math.PI / 180;
  const deltaPhi = (coord2.latitude - coord1.latitude) * Math.PI / 180;
  const deltaLambda = (coord2.longitude - coord1.longitude) * Math.PI / 180;

  const a = Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
            Math.cos(phi1) * Math.cos(phi2) *
            Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distanceInMeters = R * c; // 미터
  return distanceInMeters / 1000; // 킬로미터로 반환 
}