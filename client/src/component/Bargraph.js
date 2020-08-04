import "./Bargraph.scss";
import { bindEvent } from "../util/util";
import { getStatisticsData } from "../store";

export default function Bargraph() {
  const componentName = "bargraph";

  function render() {
    const statistics = getStatisticsData();
    const colorPalette = [
      "#035aa6",
      "#df5e88",
      "#05dfd7",
      "#f37121",
      "#96bb7c",
      "#abc2e8",
    ];

    const html = `
      <figcaption>카테고리별 지출</figcaption>
      <ul>
      ${statistics
        .map((item, idx) => {
          const color = colorPalette[idx % colorPalette.length];
          return `<li>
        <div class="bar-category">${item.category}</div>
        <div class="bar-percentage">${item.percentage} %</div>
        <div class="bar-graph">
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="chart" width="100%" height="40" aria-labelledby="title" role="img">
        <g class="bar">
        <rect y="10" width="${item.percentage * 5}" height="20" fill="${color}">
          <animate attributeName="width" from="0" to ="${
            item.percentage * 5
          }" dur="1s" fill="freeze"/>
        </rect>
        </g>
        </svg>
        </div>
        <div class="bar-price">${item.totalPrice} 원</div>
        </li>`;
        })
        .join("")}
      </ul>
    
    
      `;

    const $header = document.querySelector(`.${componentName}`);
    $header.innerHTML = html;

    // bindEvent("button.header-payment-btn", "click", onPaymentBtnClick);
  }

  setTimeout(render, 0);

  return `<figure class=${componentName}></figure>`;
}
