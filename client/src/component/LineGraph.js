import "./LineGraph.scss";

export default function LineGraph() {
  const componentName = "lineGraph";

  function render() {
    const statistics = getStatisticsData();
    const html = `
      <figcaption>별 지출</figcaption>
      <ul data-fesa-num="${statistics.length}">
      ${statistics
        .map((item, idx) => {
          const color = colorPalette[idx % colorPalette.length];
          return `<li>
        <div class="bar-category">${item.category}</div>
        <div class="bar-percentage">${item.percentage} %</div>
        <div class="bar-graph">
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="chart" width="100%" height="40" aria-labelledby="title" role="img">
        <g class="bar">
        <rect y="10" width="${item.percentage * 3}" height="20">
          <animate attributeName="width" from="0" to ="${
            item.percentage * 3
          }" dur="1s" fill="freeze"/>
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
    
    
      `;

    const $header = document.querySelector(`.${componentName}`);
    $header.innerHTML = html;

    // bindEvent("button.header-payment-btn", "click", onPaymentBtnClick);
  }

  setTimeout(render, 0);

  return `<figure class=${componentName}></figure>`;
}
