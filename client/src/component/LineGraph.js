import "./LineGraph.scss";
import {
  getCurrentDate,
  subscribe,
  getCategoryRadioChecked,
  getLedgerItemByDate,
  unsubscribe,
} from "../store";
import { getDailyOutcomeSum } from "../util/sumCalculator";
import { CIRCLE_RADIUS } from "../util/constant";
import { getNextPageURI } from "../util/util";

export default function LineGraph() {
  const componentName = "linegraph";

  function onPopState() {
    const nextPageURI = getNextPageURI();
    if (nextPageURI === "statistics") return;

    unsubscribe(componentName, "currentDate");
    unsubscribe(componentName, "ledgerItem");
    unsubscribe(componentName, "isCategoryRadioChecked");
  }
  window.addEventListener("popstate", onPopState.bind(this));

  function render() {
    const { year, month } = getCurrentDate();
    const lastDay = new Date(year, month, 0).toString().split(" ")[2];
    const iter = lastDay % 5 === 0 ? lastDay / 5 : parseInt(lastDay / 5) + 1;

    const html = `
    <div class="${getCategoryRadioChecked() ? "hidden" : ""}">
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
      <text x="440" y="440" class="label-title">날짜</text>
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
        if (unit <= 9)
          return `${110 + i * (650 / lastDay)}, ${370 - unit * 36.5}`;
        else return `${110 + i * (650 / lastDay)}, ${370 - 9.5 * 36.5}`;
      })}
      "/>
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
        return `${
          unit <= 9
            ? `<circle cx="${110 + i * (650 / lastDay)}" cy="${
                370 - unit * 36.5
              }" data-value="${outcomeSum}" r="4"/>`
            : `<circle cx="${110 + i * (650 / lastDay)}" cy="${
                370 - 9.5 * 36.5
              }" data-value="${outcomeSum}" r="${CIRCLE_RADIUS}"/>`
        }
        ${
          outcomeSum === 0
            ? ""
            : outcomeSum > 450000
            ? `<text class="amount-label" x="${90 + i * (650 / lastDay)}" y="${
                350 - 9.2 * 36.5
              }">
      ${parseInt(outcomeSum / 10000)} 만원</text>`
            : `<text class="amount-label" x="${90 + i * (650 / lastDay)}" y="${
                350 - unit * 36.5
              }">
${parseInt(outcomeSum / 10000)} 만원</text>`
        }`;
      })}
    </g>
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
