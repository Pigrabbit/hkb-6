import "./StatisticsMenu.scss";

export default function StatisticsMenu() {
  const componentName = "statistics-menu";

  function render() {
    const html = `
    <div>
    <input type="radio" id="male" name="gender" value="male">
    <label for="male">카테고리별 지출</label>
    <input type="radio" id="female" name="gender" value="female">
    <label for="female">일별 지출</label>
    </div>
    <div>
      <p>이번 달 지출 금액</p>
      <p class="current-month-total-price">444,790원</p>
    </div>
      `;

    const $header = document.querySelector(`.${componentName}`);
    $header.innerHTML = html;

    // bindEvent("button.header-payment-btn", "click", onPaymentBtnClick);
  }

  setTimeout(render, 0);

  return `<header class=${componentName}></header>`;
}
