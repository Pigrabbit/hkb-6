import "./Calendar.scss";
import { $ } from "../util/util";
import { WEEKDAYS } from "../util/constant";

export default function Calendar() {
    const componentName = "calendar";

    function render() {
        const html = `
            <div class="calendar-header">
                ${WEEKDAYS.map(weekday => {
                    return `<div class="calendar-header-day">${weekday}</div>`;
                }).join('')}
            </div>
            <div class="calendar-body">
            </div>
        `;

        const $calendar = $(`.${componentName}`);
        $calendar.innerHTML = html
    }

    setTimeout(render, 0);

    return `<div class=${componentName}></div>`;
}