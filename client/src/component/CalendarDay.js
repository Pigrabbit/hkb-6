import "./CalendarDay.scss";
import { $ } from "../util/util";

export default function CalendarDay(props) {
  const componentClass = "calendar-day";
  const componentName = `calendar-day-${props.month}-${props.day + 1}`;

  const { isToday, isPrevMonthDay, isNextMonthDay} = props;
  
  const isCurrentMonthDay = !(isPrevMonthDay || isNextMonthDay);

  function render() {
    const html = `
            <div class="calendar-day-number">${props.day + 1}</div>
            <p class="calendar-day-income income-text ${
              isCurrentMonthDay ? "" : "hidden"
            }">1000원</p>
            <p class="calendar-day-outcome outcome-text ${
              isCurrentMonthDay ? "" : "hidden"
            }">-2000원</p>
        `;

    const $calendarDay = $(`div#${componentName}`);
    $calendarDay.innerHTML = html;
  }

  setTimeout(render, 0);

  return `<div class="${componentClass}
            ${isToday ? "today": ""}
            ${isPrevMonthDay ? "prev-month-day" : ""}
            ${isNextMonthDay ? "next-month-day" : ""}
            "
            id=${componentName}></div>`;
}
