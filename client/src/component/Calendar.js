import "./Calendar.scss";
import { $ } from "../util/util";
import { WEEKDAYS } from "../util/constant";
import CalendarDay from "./CalendarDay";

export default function Calendar() {
  const componentName = "calendar";

  function getCurrentYearMonth() {
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    return { year, month };
  }

  function render() {
    let { year, month } = getCurrentYearMonth();
    console.log(year, month);

    // TODO: 지난 달 날짜 채우기
    // 이번 달 첫 날이 무슨요일인지
    // 0: 일요일, 1: 월요일 ... 6: 토요일
    const firstDayIdx = new Date(year, month - 1, 1).getDay();
    const prevMonthLastWeekIdx = [...Array(firstDayIdx).keys()].reverse();
    const lastDayPrevMonth = new Date(year, month - 1, 0).getDate();

    // TODO: 이번 달 날짜 채우기
    // 이번 달 마지막 날이 몇 일인지 (30일? 31일?)
    const lastDayCurrentMonth = new Date(year, month, 0).getDate();
    const currentMonthDays = [...Array(lastDayCurrentMonth).keys()];

    // TODO: 다음 달 날짜 채우기
    // 이번 달 마지막 날이 무슨요일인지
    const lastDayIdx = new Date(year, month, 0).getDay();
    const nextMonthFirstWeekIdx = [...Array(6 - lastDayIdx).keys()];

    const html = `
            <div class="calendar-header">
                ${WEEKDAYS.map((weekday) => {
                  return `<div class="calendar-header-day">${weekday}</div>`;
                }).join("")}
            </div>
            <div class="calendar-body">
                ${prevMonthLastWeekIdx
                  .map((day) => {
                    return CalendarDay({
                      month: month - 1,
                      day: lastDayPrevMonth - 1 - day,
                      isPrevMonthDay: true,
                    });
                  })
                  .join("")}
                ${currentMonthDays
                  .map((day) => {
                    return CalendarDay({ month, day });
                  })
                  .join("")}
                  ${nextMonthFirstWeekIdx.map((day) => {
                    return CalendarDay({
                        month: month + 1,
                        day: day,
                        isNextMonthDay: true,
                    })
                  }).join("")}
            </div>
        `;

    const $calendar = $(`.${componentName}`);
    $calendar.innerHTML = html;
  }

  setTimeout(render, 0);

  return `<div class=${componentName}></div>`;
}
