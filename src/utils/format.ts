export const formatPace = (pace : number | null) => {
    if (pace === null || !isFinite(pace) || pace === 0) { // pace가 0일 때도 처리
        return `-'--"`
    }

    const totalMinutes = pace; // pace 자체가 이미 분 단위 값 (예: 6.666...)
    const minutes = Math.floor(totalMinutes); // 정수 부분 (분)
    const seconds = Math.round((totalMinutes - minutes) * 60); // 소수 부분을 초로 변환 후 반올림

    // 초가 60 이상이 되는 예외 처리 (예: 59.9초가 60초로 반올림될 때)
    if (seconds >= 60) {
        return `${String(minutes + 1).padStart(2, '0')}'00"`
    }

    return `${String(minutes).padStart(2, '0')}'${String(seconds).padStart(2, '0')}"`
  } 

export const formatTime = (time :number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const sec = time % 60;

    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
}
  