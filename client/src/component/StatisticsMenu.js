import "./StatisticsMenu.scss";
import {
  subscribe,
  toggleCategoryRadioChecked,
  getCategoryRadioChecked,
  getLedgerItem,
  unsubscribe,
} from "../store";
import { bindEventAll, getNextPageURI, $ } from "../util/util";
import { getMonthlyOutcomeSum } from "../util/sumCalculator";
import { addCommaToNumber } from "../util/validation";

export default function StatisticsMenu() {
  const componentName = "statistics-menu";

  function toggleRadioBtn(e) {
    if (getCategoryRadioChecked() && e.target.id === "category_radio") return;
    if (!getCategoryRadioChecked() && e.target.id === "daily_radio") return;
    toggleCategoryRadioChecked();
  }

  function onPopState() {
    const nextPageURI = getNextPageURI();
    if (nextPageURI === "statistics") return;

    unsubscribe(componentName, "isCategoryRadioChecked");
    unsubscribe(componentName, "ledgerItem");
  }

  window.addEventListener("popstate", onPopState.bind(this));

  function render() {
    const ledgerItem = getLedgerItem();
    const monthlyOutcomeSum = getMonthlyOutcomeSum(ledgerItem);

    const html = `
    <div class="statistics-menu-radio-btns">
      <input type="radio" ${getCategoryRadioChecked() ? "checked" : ""} 
          id="category_radio" class="stat-menu-radio"
          name="category_radio" value="category_radio">
      <label for="category_radio">카테고리별 지출</label>
      <input type="radio" ${getCategoryRadioChecked() ? "" : "checked"}
           id="daily_radio" class="stat-menu-radio"
           name="daily_radio" value="daily_radio">
      <label for="daily_radio">일별 지출</label>
    </div>
    <div class="statistics-menu-monthly-sum">
      <p class="statistics-menu-monthly-sum-label">이번 달 지출 금액</p>
      <p class="statistics-menu-monthly-sum-value">${addCommaToNumber(monthlyOutcomeSum)} 원</p>
    </div>
    `;

    const $header = $(`.${componentName}`);
    $header.innerHTML = html;

    bindEventAll("input.stat-menu-radio", "click", toggleRadioBtn);
  }
  subscribe(componentName, "isCategoryRadioChecked", render);
  subscribe(componentName, "ledgerItem", render);

  setTimeout(render, 0);

  return `<header class=${componentName}></header>`;
}
