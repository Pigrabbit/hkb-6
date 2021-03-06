import "./Bargraph.scss";
import {
  getStatisticsData,
  getCategoryRadioChecked,
  subscribe,
  unsubscribe,
} from "../store";
import { addCommaToNumber } from "../util/validation";
import { getRandomColor, getNextPageURI, $ } from "../util/util";

export default function Bargraph() {
  const componentName = "bargraph";

  function onPopState() {
    const nextPageURI = getNextPageURI();
    if (nextPageURI === "statistics") return;

    unsubscribe(componentName, "isCategoryRadioChecked");
    unsubscribe(componentName, "statistics");
  }
  window.addEventListener("popstate", onPopState.bind(this));

  function render() {
    const statistics = getStatisticsData();
    if (statistics.length === 0) {
      const html= "";
      const $header = $(`.${componentName}`);
      $header.innerHTML = html;      
      return;
    }

    const html = `
    <div class="${getCategoryRadioChecked() ? "" : "hidden"}">
      <figcaption>카테고리별 지출</figcaption>
      <ul>
      ${statistics
        .map((item) => {
          const color = getRandomColor();
          return `<li>
        <div class="bar-category">${item.category}</div>
        <div class="bar-percentage">${item.percentage} %</div>
        <div class="bar-graph">
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="chart" width="100%" height="40" aria-labelledby="title" role="img">
        <g class="bar">
        <rect y="10" width="${
          item.percentage * 3
        }" height="20" fill="#${color}">
          <animate attributeName="width" from="0" to ="${
            item.percentage * 3
          }" dur="3s" fill="freeze"/>
          </rect>
          <text x="${item.percentage * 3 + 20}" y="25">${item.category}</text>
        </g>
        </svg>
        </div>
        <div class="bar-price">${addCommaToNumber(item.totalPrice)} 원</div>
        </li>`;
        })
        .join("")}
      </ul>
      </div>
    
    
      `;

    const $header = document.querySelector(`.${componentName}`);
    $header.innerHTML = html;
  }
  subscribe(componentName, "isCategoryRadioChecked", render);
  subscribe(componentName, "statistics", render);

  setTimeout(render, 0);

  return `<figure class=${componentName}></figure>`;
}
