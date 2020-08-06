import "./StatisticsMenu.scss";
import {
  subscribe,
  toggleCategoryRadioChecked,
  getCategoryRadioChecked,
  getLedgerItem,
} from "../store";
import { bindEventAll } from "../util/util";
import { getMonthlyOutcomeSum } from "../util/sumCalculator";
import { addCommaToNumber } from "../util/validation";

export default function StatisticsMenu() {
  const componentName = "statistics-menu";

  function toggleRadioBtn(e) {
    if (getCategoryRadioChecked() && e.target.id === "category_radio") return;
    if (!getCategoryRadioChecked() && e.target.id === "daily_radio") return;
    toggleCategoryRadioChecked();
  }

  function render() {
    const ledgerItem = getLedgerItem();
    const monthlyOutcomeSum = getMonthlyOutcomeSum(ledgerItem);
    const outcomeSumWithComma = addCommaToNumber(monthlyOutcomeSum);

    const html = `
    <div>
    <input type="radio" ${
      getCategoryRadioChecked() ? "checked" : ""
    } id="category_radio" name="category_radio" value="category_radio">
    <label for="category_radio">카테고리별 지출</label>
    <input type="radio" ${
      getCategoryRadioChecked() ? "" : "checked"
    } id="daily_radio" name="daily_radio" value="daily_radio">
    <label for="daily_radio">일별 지출</label>
    </div>
    <div>
      <p>이번 달 지출 금액</p>
      <p class="current-month-total-price">${outcomeSumWithComma}원</p>
    </div>
      `;

    const $header = document.querySelector(`.${componentName}`);
    $header.innerHTML = html;
    bindEventAll("input", "click", toggleRadioBtn);
  }
  subscribe(componentName, "isCategoryRadioChecked", render);
  setTimeout(render, 0);

  return `<header class=${componentName}></header>`;
}
