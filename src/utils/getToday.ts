export const getToday = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, '0'); // getMonth()는 0부터 시작하므로 1을 더해줍니다.
  const date = (today.getDate()).toString().padStart(2,'0');
  const day = today.getDay();
  return { today : `${year}-${month}-${date}`, day : day}
} 

export function getTimeOfDay() {
  const currentHour = new Date().getHours();

  if (currentHour >= 6 && currentHour < 12) {
    return "아침";
  } else if (currentHour >= 12 && currentHour < 18) {
    return "낮";
  } else if (currentHour >= 18 && currentHour < 24) {
    return "저녁";
  } else {
    return "밤";
  }
}

