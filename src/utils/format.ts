export const formatPace = (pace : number) => {
    const min = Math.trunc(pace / 60);
    const sec = pace % 60;
    return `${min}'${sec}"`
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
  