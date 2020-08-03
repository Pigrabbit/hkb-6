import "./CalendarDay.scss";
import { $ } from "../util/util";

export default function CalendarDay(props) {
    const componentClass = "calendar-day" 
    const componentName = `calendar-day-${props.month}-${props.day+1}`;

    const isPrevMonthDay = props.isPrevMonthDay;
    const isNextMonthDay = props.isNextMonthDay;

    function render() {
        const html = `
            <div class="calendar-day-number">${props.day + 1}</div>
            <p class="calendar-day-income"></p>
            <p class="calendar-day-outcome"></p>
        `;

        const $calendarDay = $(`div#${componentName}`);
        $calendarDay.innerHTML = html
    }

    setTimeout(render, 0);

    return `<div class="${componentClass}
            ${isPrevMonthDay? "prev-month-day": ""}
            ${isNextMonthDay? "next-month-day": ""}
            "
            id=${componentName}></div>`;
}