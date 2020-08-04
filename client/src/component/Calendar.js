import "./Calendar.scss";
import { $ } from "../util/util";
import { WEEKDAYS } from "../util/constant";
import CalendarDay from "./CalendarDay";
import { getCurrentDate, subscribe, unsubscribe } from "../store";

export default function Calendar() {
  const componentName = "calendar";

  function onPopState() {
    const nextPage = location.pathname.toString().replace(/^\//, "");
    if (nextPage === "calendar") return;
    
    unsubscribe(componentName, "currentDate");
  }

  window.addEventListener("popstate", onPopState.bind(this));

  function render() {
    const { year, month, day } = getCurrentDate();
    const today = day;

    // 이번 달 첫 날이 무슨요일인지
    // 0: 일요일, 1: 월요일 ... 6: 토요일
    const firstDayIdx = new Date(year, month - 1, 1).getDay();
    const prevMonthLastWeekIdx = [...Array(firstDayIdx).keys()].reverse();
    const lastDayPrevMonth = new Date(year, month - 1, 0).getDate();

    // 이번 달 마지막 날이 몇 일인지 (30일? 31일?)
    const lastDayCurrentMonth = new Date(year, month, 0).getDate();
    const currentMonthDays = [...Array(lastDayCurrentMonth).keys()];

    // 이번 달 마지막 날이 무슨요일인지
    // 0: 일요일, 1: 월요일 ... 6: 토요일
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
                      year: month === 1 ? year - 1 : year,
                      month: month === 1 ? 12 : month - 1,
                      day: lastDayPrevMonth - 1 - day,
                      isPrevMonthDay: true,
                    });
                  })
                  .join("")}
                ${currentMonthDays
                  .map((day) => {
                    return CalendarDay({
                      year,
                      month,
                      day,
                      isToday: (day + 1 === today) ? true : false,
                    });
                  })
                  .join("")}
                  ${nextMonthFirstWeekIdx
                    .map((day) => {
                      return CalendarDay({
                        year: month === 12 ? year + 1 : year,
                        month: month % 12 + 1,
                        day: day,
                        isNextMonthDay: true,
                      });
                    })
                    .join("")}
            </div>
        `;

    const $calendar = $(`.${componentName}`);
    $calendar.innerHTML = html;
  }

  subscribe(componentName, "currentDate", render);
  setTimeout(render, 0);

  return `<div class=${componentName}></div>`;
}
