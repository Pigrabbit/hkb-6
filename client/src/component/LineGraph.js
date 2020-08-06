import "./LineGraph.scss";
import {
  getCurrentDate,
  subscribe,
  getCategoryRadioChecked,
  getLedgerItemByDate,
} from "../store";
import { getDailyOutcomeSum } from "../util/sumCalculator";

export default function LineGraph() {
  const componentName = "linegraph";

  function render() {
    const { year, month } = getCurrentDate();
    const lastDay = new Date(year, month, 0).toString().split(" ")[2];
    const iter = lastDay % 5 === 0 ? lastDay / 5 : parseInt(lastDay / 5) + 1;

    const html = `
    <div style="margin:-20px" class="${
      getCategoryRadioChecked() ? "hidden" : ""
    }">
      <figcaption style="margin:0">일별 지출</figcaption>
      <svg version="1.2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="graph" aria-labelledby="title" role="img">
    <g class="grid x-grid" id="xGrid">
      <line x1="90" x2="90" y1="5" y2="370"></line>
    </g>
    <g class="grid y-grid" id="yGrid">
      <line x1="90" x2="760" y1="370" y2="370"></line>
    </g>
      <g class="labels x-labels">
      ${Array(parseInt(iter))
        .fill()
        .map(
          (item, i) =>
            `<text x="${110 + i * (650 / (lastDay / 5))}" y="400">${month}월${
              5 * i + 1
            }일</text>`
        )
        .join("")}
      <text x="400" y="440" class="label-title">날짜</text>
    </g>
    <g class="labels y-labels grid-line">
    ${Array(10)
      .fill()
      .map(
        (item, i) => `<text x="80" y="${370 - i * 36.5}">${5 * i}만</text>
        <line x1="90" x2="760" y1="${370 - i * 36.5}" y2="${
          370 - i * 36.5
        }"></line>`
      )
      .join("")}
  <text x="30" y="200" class="label-title">금액</text>
    </g>
    <g class="data" data-setname="Our first data set">
    ${Array(+lastDay)
      .fill()
      .map((item, i) => {
        const date = `${year}-${month < 10 ? `0${month}` : month}-${
          i < 9 ? `0${i + 1}` : i + 1
        }`;
        let records = getLedgerItemByDate(date);
        let outcomeSum = 0;
        if (records) {
          outcomeSum = getDailyOutcomeSum(records);
        }
        const unit = outcomeSum / 10000 / 5;
        return `<circle cx="${110 + i * (650 / lastDay)}" cy="${
          370 - unit * 36.5
        }" data-value="${outcomeSum}" r="4"/>`;
      })}
    </g>
   
    <polyline
    fill="none"
    stroke="#0074d9"
    stroke-width="3"
    points="90,370,${Array(+lastDay)
      .fill()
      .map((item, i) => {
        const date = `${year}-${month < 10 ? `0${month}` : month}-${
          i < 9 ? `0${i + 1}` : i + 1
        }`;
        let records = getLedgerItemByDate(date);
        let outcomeSum = 0;
        if (records) {
          outcomeSum = getDailyOutcomeSum(records);
        }
        const unit = outcomeSum / 10000 / 5;
        return `${110 + i * (650 / lastDay)}, ${370 - unit * 36.5}`;
      })}
      "/>
    </svg>
    </div>
      `;

    const $header = document.querySelector(`.${componentName}`);
    $header.innerHTML = html;
  }
  subscribe(componentName, "isCategoryRadioChecked", render);
  subscribe(componentName, "currentDate", render);
  setTimeout(render, 0);

  return `<figure class=${componentName}></figure>`;
}
