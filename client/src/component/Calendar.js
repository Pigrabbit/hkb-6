import { $ } from "../util/util";

export default function Calendar() {
    const componentName = "calendar";

    function render() {
        const weekdays = ["일", "월", "화", "수"]
        const html = `
        
        `;

        const $calendar = $(`.${componentName}`);
        $calendar.innerHTML = html

    }

    setTimeout(render, 0);

    return `<div class=${componentName}></div>`;
}