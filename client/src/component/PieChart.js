import "./PieChart.scss";

import { $ } from "../util/util";
import { getStatisticsData } from "../store";

export default function PieChart() {
  const componentName = "piechart";

  function render() {
    const statisticsData = getStatisticsData();
    console.log(statisticsData);

    // SVG 관련 상수
    const radius = 30;
    const pi = 3.14;
    const circumference = 2 * pi * radius;
    const outerRadius = 45;

    // 차트 그리기
    // 누적 percentage 구하기
    // const ascendingPercentages = statisticsData.map(item => parseInt(item.percentage))
    // .sort((a, b) => a - b);
    // ascendingPercentages.push(100);
    // console.log(ascendingPercentages);
    const percentages = statisticsData.map(item => parseInt(item.percentage));
    percentages.push(100 - percentages.reduce((acc, cur) => acc + cur));
    console.log(percentages);

    const accumulatedPercentages = Object.values(statisticsData)
      .sort((a, b) =>
        parseInt(a.percentage) > parseInt(b.percentages) ? 1 : -1
      )
      .map((_, idx, arr) => {
        return arr
          .slice(idx)
          .reduce((acc, cur) => acc + parseInt(cur.percentage), 0);
      });

    accumulatedPercentages.unshift(100);
    console.log(accumulatedPercentages);

    const categories = statisticsData.map((item) => item.category);
    categories.push("기타");
    categories.reverse();
    console.log(categories);

    // 라벨 넣기

    const labelCoords = [];
    const degrees = [];
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
        theta = prevTheta + (curTheta / 2);
      }

    //   console.log(theta);
      labelCoords.unshift(labelCoords[idx] = {
        x: Math.sin((theta) * (pi / 180)) * outerRadius,
        y: -Math.cos((theta) * (pi / 180)) * outerRadius,
      })
    //   labelCoords[idx] = {
    //     x: Math.sin((theta) * (pi / 180)) * outerRadius,
    //     y: -Math.cos((theta) * (pi / 180)) * outerRadius,
    //   };
    });

    console.log(labelCoords);

    const html = `
    <svg class="pie-chart-svg" viewBox="-50 -50 100 100">
        ${accumulatedPercentages
          .map((percentage, idx) => {
            return `
                <circle class="${categories[idx]} target" r="30" cx="0" cy="0" fill="transparent"
                stroke-width="20"
                stroke-dasharray="calc((${percentage}/100) * ${circumference}) ${circumference}"
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

  setTimeout(render, 0);

  return `<figure class=${componentName}></div>`;
}
