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

export function getWeekRange(dateString?: string) {
  const now = dateString ? new Date(dateString) : new Date();

  // UTC+9 기준으로 요일과 날짜를 계산
  const utc9OffsetInMinutes = 9 * 60; // UTC+9는 540분
  const utc9Time = now.getTime() + now.getTimezoneOffset() * 60 * 1000 + utc9OffsetInMinutes * 60 * 1000;
  const day = new Date(utc9Time);

  const dayOfWeek = day.getUTCDay(); // UTC 요일(0: 일요일, 1: 월요일)을 가져옴

  // 월요일을 주의 시작일로 설정하기 위한 차이 계산
  const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  
  // 주의 시작일 계산
  const startOfWeek = new Date(utc9Time);
  startOfWeek.setUTCDate(day.getUTCDate() + diffToMonday);
  startOfWeek.setUTCHours(0, 0, 0, 0); // UTC+9 기준 00시 00분 00초

  // 주의 마지막 날 계산
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setUTCDate(startOfWeek.getUTCDate() + 6);
  endOfWeek.setUTCHours(23, 59, 59, 999); // UTC+9 기준 23시 59분 59초

  return { startOfWeek, endOfWeek };
}



