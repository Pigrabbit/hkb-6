import "./PieChart.scss";

import { $, toRadian, getNextPageURI } from "../util/util";
import {
  getStatisticsData,
  getCategoryRadioChecked,
  subscribe,
  unsubscribe,
} from "../store";
import {
  PIECHART_RADIUS,
  PIECHART_CIRCUMFERENCE,
  PIECHART_OUTER_RADIUS,
} from "../util/constant";

export default function PieChart() {
  const componentName = "piechart";

  function onPopState() {
    const nextPageURI = getNextPageURI();
    if (nextPageURI === "statistics") return;

    unsubscribe(componentName, "isCategoryRadioChecked");
  }
  window.addEventListener("popstate", onPopState.bind(this));

  function render() {
    const statisticsData = getStatisticsData();

    const categories = statisticsData.map((item) => item.category);
    categories.reverse();

    function getAccumulatedPecentages(statisticsData) {
      const accumulatedPercentages = Object.values(statisticsData)
        .sort((a, b) =>
          parseInt(a.percentage) > parseInt(b.percentages) ? 1 : -1
        )
        .map((_, idx, arr) => {
          return arr
            .slice(idx)
            .reduce((acc, cur) => acc + parseInt(cur.percentage), 0);
        });
      return accumulatedPercentages;
    }

    const accumulatedPercentages = getAccumulatedPecentages(statisticsData);

    function getLabelCoords() {
      const labelCoords = [];
      const degrees = [];

      const percentages = statisticsData.map((item) =>
        parseInt(item.percentage)
      );

      percentages.forEach((percentage, idx) => {
        let theta;

        if (idx === 0) {
          theta = 360 * (percentage / 100);
          degrees.push(theta);
          theta = theta / 2;
        } else {
          const prevTheta = degrees.pop();
          const curTheta = 360 * (percentage / 100);

          degrees.push(prevTheta + curTheta);
          theta = prevTheta + curTheta / 2;
        }

        labelCoords.unshift(
          (labelCoords[idx] = {
            x: Math.sin(toRadian(theta)) * PIECHART_OUTER_RADIUS,
            y: -Math.cos(toRadian(theta)) * PIECHART_OUTER_RADIUS,
          })
        );
      });
      return labelCoords;
    }

    const labelCoords = getLabelCoords();

    const html = `
    <svg class="pie-chart-svg ${
      getCategoryRadioChecked() ? "" : "hidden"
    }" viewBox="-50 -50 100 100">
        ${accumulatedPercentages
          .map((percentage, idx) => {
            return `
                <circle class="${categories[idx]} target" r=${PIECHART_RADIUS} cx="0" cy="0" fill="transparent"
                stroke-width="20"
                stroke-dasharray="calc((${percentage}/100) * ${PIECHART_CIRCUMFERENCE}) ${PIECHART_CIRCUMFERENCE}"
                transform="rotate(-90)"/>`;
          })
          .join("")}
          ${categories
            .map((category, idx) => {
              return `
                <text class="${category} label" x=${labelCoords[idx].x} y=${labelCoords[idx].y}>${category}</text>
            `;
            })
            .join("")}
        <circle class="inner" r="10" cx="0" cy="0" fill="white"/>
    </svg>
    `;

    const $pieChart = $(`.${componentName}`);
    $pieChart.innerHTML = html;
  }
  subscribe(componentName, "isCategoryRadioChecked", render);
  subscribe(componentName, "statistics", render);
  setTimeout(render, 0);

  return `<figure class=${componentName}></div>`;
}
