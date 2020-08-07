import "./LineGraph.scss";
import {
  subscribe,
  getCategoryRadioChecked,
  unsubscribe,
  getStatisticsData,
  getPreviousStatisticsData,
} from "../store";
import { getNextPageURI, getRandomColor } from "../util/util";

export default function StackedBar() {
  const componentName = "stacked-bar";

  function onPopState() {
    const nextPageURI = getNextPageURI();
    if (nextPageURI === "statistics") return;

    unsubscribe(componentName, "ledgerItem");
    unsubscribe(componentName, "isCategoryRadioChecked");
    unsubscribe(componentName, "currentDate", render);
    unsubscribe(componentName, "statistics", render);
    unsubscribe(componentName, "previousStatistics", render);
  }
  window.addEventListener("popstate", onPopState.bind(this));

  function render() {
    const thisMonthData = getStatisticsData();
    const previousMonthData = getPreviousStatisticsData();
    const accumulatedSum = [];
    const previousAccumulatedSum = [];
    thisMonthData.reduce((acc, cur) => {
      accumulatedSum.push(acc + cur.percentage);
      return acc + cur.percentage;
    }, 0);
    previousMonthData.reduce((acc, cur) => {
      previousAccumulatedSum.push(acc + cur.percentage);
      return acc + cur.percentage;
    }, 0);

    accumulatedSum.sort((a, b) => b - a);
    previousAccumulatedSum.sort((a, b) => b - a);

    const html = `
    <div class="${getCategoryRadioChecked() ? "hidden" : ""}">
      <figcaption style="margin:0">누적 합계</figcaption>
      <svg version="1.2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="graph" aria-labelledby="title" role="img">
    <g class="grid x-grid" id="xGrid">
      <line x1="90" x2="90" y1="5" y2="370"></line>
    </g>
    <g class="grid y-grid" id="yGrid">
      <line x1="90" x2="760" y1="370" y2="370"></line>
    </g>
      <g class="labels x-labels">
      <text x="60" y="${370 - (360 / 3) * 2}">7월</text>
      <text x="60" y="${370 - 360 / 3}">8월</text>
      ${accumulatedSum
        .map((item, i) => {
          const color = getRandomColor();
          return `<rect x="90" y="${370 - 365 / 3}" width="${
            item * 5
          }" height="20" fill="#${color}">
          <animate attributeName="width" from="0" to ="${
            item * 5
          }" dur="4s" fill="freeze"/>
          </rect>
          ${
            i === 0
              ? `<text x="${(item * 5 - 80) / 2}" y="${350 - 365 / 3}">${
                  thisMonthData[i].category
                }(${thisMonthData[i].percentage}%)</text>`
              : `<text x="${
                  80 + ((accumulatedSum[i] + accumulatedSum[i - 1]) * 5) / 2
                }" y="${i % 2 === 0 ? 350 - 365 / 3 : 410 - 365 / 3}">${
                  thisMonthData[thisMonthData.length - i].category
                }(${
                  thisMonthData[thisMonthData.length - i].percentage
                }%)</text>`
          }
          `;
        })
        .join("")}

        ${previousAccumulatedSum
          .map((item, i) => {
            const color = getRandomColor();
            return `<rect x="90" y="${370 - (365 / 3) * 2}" width="${
              item * 5
            }" height="20" fill="#${color}">
            <animate attributeName="width" from="0" to ="${
              item * 5
            }" dur="4s" fill="freeze"/>
            </rect>
            ${
              i === 0
                ? `<text x="${(item * 5 - 80) / 2}" y="${
                    350 - (365 / 3) * 2
                  }">${previousMonthData[i].category}(${
                    previousMonthData[i].percentage
                  }%)</text>`
                : `<text x="${
                    80 + ((accumulatedSum[i] + accumulatedSum[i - 1]) * 5) / 2
                  }" y="${
                    i % 2 === 0 ? 350 - (365 / 3) * 2 : 410 - (365 / 3) * 2
                  }">${
                    previousMonthData[previousMonthData.length - i].category
                  }(${
                    previousMonthData[previousMonthData.length - i].percentage
                  }%)</text>`
            }`;
          })
          .join("")}
      
    </g>

    </g>
    </svg>
    </div>
      `;

    const $header = document.querySelector(`.${componentName}`);
    $header.innerHTML = html;
  }
  subscribe(componentName, "isCategoryRadioChecked", render);
  subscribe(componentName, "ledgerItem", render);
  subscribe(componentName, "currentDate", render);
  subscribe(componentName, "statistics", render);
  subscribe(componentName, "previousStatistics", render);
  setTimeout(render, 0);

  return `<figure class=${componentName}></figure>`;
}
