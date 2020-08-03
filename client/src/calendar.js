function getCurrentYearMonth() {
  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;
  return { year, month };
}

function init() {
  const $calendarBody = document.querySelector("div.calendar-body");
  let { year, month } = getCurrentYearMonth();
  year = 2020;
  month = 7;
  console.log(`${year}년 ${month}월`);

  // 이번 달 마지막 날이 몇 일인지 (30일? 31일?)
  const lastDayCurrentMonth = new Date(year, month, 0).getDate();

  // 이번 달 첫 날이 무슨요일인지
  // 0: 일요일, 1: 월요일 ... 6: 토요일
  const firstDayIdx = new Date(year, month - 1, 1).getDay();
  const lastDayPrevMonth = new Date(year, month - 1, 0).getDate();

  // 이번 달 마지막 날이 무슨요일인지
  const lastDayIdx = new Date(year, month, 0).getDay();

  // 지난 달 날짜 채우기
  const prevMonthLastWeekIdx = [...Array(firstDayIdx).keys()].reverse();
  prevMonthLastWeekIdx.forEach((day) => {
    const $calendarBodyDay = document.createElement("div");
    $calendarBodyDay.classList.add("calendar-body-day");
    $calendarBodyDay.classList.add("prev-month-day");
    $calendarBodyDay.innerHTML = `
        <div class="calendar-body-day-number">${lastDayPrevMonth - day}</div>
        <p class="calendar-body-day-income"></p>
        <p class="calendar-body-day-outcome"></p>
        `;
    $calendarBody.appendChild($calendarBodyDay);
  });

  // 이번 달 날짜 채우기
  const currentMonthDays = [...Array(lastDayCurrentMonth).keys()];
  currentMonthDays.forEach((day) => {
    const $calendarBodyDay = document.createElement("div");
    $calendarBodyDay.className = "calendar-body-day";
    $calendarBodyDay.innerHTML = `
        <div class="calendar-body-day-number">${day + 1}</div>
        <p class="calendar-body-day-income"></p>
        <p class="calendar-body-day-outcome"></p>
        `;

    $calendarBody.appendChild($calendarBodyDay);
  });

  // 다음 달 날짜 채우기
  const nextMonthFirstWeekIdx = [...Array(6 - lastDayIdx).keys()];
  nextMonthFirstWeekIdx.forEach((day) => {
    const $calendarBodyDay = document.createElement("div");
    $calendarBodyDay.classList.add("calendar-body-day");
    $calendarBodyDay.classList.add("next-month-day");
    $calendarBodyDay.innerHTML = `
        <div class="calendar-body-day-number">${day + 1}</div>
        <p class="calendar-body-day-income"></p>
        <p class="calendar-body-day-outcome"></p>
        `;
    $calendarBody.appendChild($calendarBodyDay);
  });
}

init();
