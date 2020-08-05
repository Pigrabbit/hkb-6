import "./PieChart.scss";

import { $ } from "../util/util";
import { getStatisticsData } from "../store";

export default function PieChart() {
  const componentName = "piechart";

  function render() {
    const statisticsData = getStatisticsData();
    console.log(statisticsData);

    const radius = 10;
    const pi = 3.14;
    const circumference = 2 * pi * radius;

    // 오름차순 정렬
    const percentagesNew = Object.values(statisticsData)
        .sort((a, b) => (parseInt(a.percentage) > parseInt(b.percentages)) ? 1 : -1);
    console.log(percentagesNew)

    const accumulatedPercentages = percentagesNew.map(( _, idx, arr) => {
        return arr.slice(idx).reduce((acc, cur) => acc + parseInt(cur.percentage), 0);
    });
    accumulatedPercentages.unshift(100);
    console.log(accumulatedPercentages);
    

    const categories = statisticsData.map(item => item.category);
    categories.push("기타");
    console.log(categories);
    const reversed = categories.reverse();
    console.log(reversed);

    const categoryEng = {
        "생활": "life",
        "식비": "grocery",
        "의료/건강": "health",
        "쇼핑/뷰티": "shopping",
        "교통": "transportation",
        "기타": "etc",
    };

    const html = `
    <svg class="pie-chart-svg" viewBox="0 0 40 40">
        ${accumulatedPercentages.map((percentage, idx) => {
            return `
                <circle class="${categoryEng[categories[idx]]} target" r="10" cx="20" cy="20" fill="transparent"
                stroke-width="20"
                stroke-dasharray="calc((${percentage}/100) * ${circumference}) ${circumference}"
                transform="rotate(-90) translate(-40)"/>`;
        }).join("")}
        <circle class="inner" r="10" cx="20" cy="20" fill="white"/>
    </svg>
    `;

    const $pieChart = $(`.${componentName}`);
    $pieChart.innerHTML = html;

    // const $pies = [...document.querySelectorAll("circle.target")];

    // const data = {
    //   life: 71,
    //   grocery: 16,
    //   transportation: 4,
    // };

    // const percentages = Object.values(data)
    //   .sort((a, b) => a - b) // 오름차순 정렬
    //   .map((num, idx, arr) => {
    //     // 자기 보다 뒤에 나오는 element 모두 sum
    //     return arr.slice(idx).reduce((acc, cur) => acc + cur);
    //   });

    // $pies.forEach((pie, idx) => {
    //   if (idx === 0) {
    //     pie.setAttribute(
    //       "stroke-dasharray",
    //       `${circumference} ${circumference}`
    //     );
    //   } else {
    //     pie.setAttribute(
    //       "stroke-dasharray",
    //       `calc((${
    //         percentages[idx - 1]
    //       }/100) * ${circumference}) ${circumference}`
    //     );
    //   }
    // });
  }

  setTimeout(render, 0);

  return `<figure class=${componentName}></div>`;
}
