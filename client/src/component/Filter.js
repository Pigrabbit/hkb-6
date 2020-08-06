import "./Filter.scss";
import { bindEvent, $, getNextPageURI } from "../util/util";
import {
  getIsLedgerIncomeVisible,
  getIsLedgerOutcomeVisible,
  toggleLedgerOutcomeVisible,
  toggleLedgerIncomeVisible,
  subscribe,
  getLedgerItem,
  unsubscribe,
} from "../store";
import {
  getMonthlyIncomeSum,
  getMonthlyOutcomeSum,
} from "../util/sumCalculator";
import { addCommaToNumber } from "../util/validation";

export default function Filter() {
  const componentName = "filter";

  function onPopState() {
    const nextPageURI = getNextPageURI();
    if (nextPageURI === "list" || nextPageURI === "calendar") return;
    unsubscribe(componentName, "isLedgerIncomeVisible");
    unsubscribe(componentName, "isLedgerOutcomeVisible");
    unsubscribe(componentName, "ledgerItem");
  }

  window.addEventListener("popstate", onPopState.bind(this));

  function onIncomeFilterClick(e) {
    toggleLedgerIncomeVisible();
  }

  function onOutcomeFilterClick(e) {
    toggleLedgerOutcomeVisible();
  }

  function render() {
    const isLedgerIncomeVisible = getIsLedgerIncomeVisible();
    const isLedgerOutcomeVisible = getIsLedgerOutcomeVisible();

    const ledgerItem = getLedgerItem();
    const monthlyIncomeSum = getMonthlyIncomeSum(ledgerItem);
    const monthlyOutcomeSum = getMonthlyOutcomeSum(ledgerItem);

    const html = ` 
    <li class="filter-item">
        <input
          type="checkbox"
          ${isLedgerIncomeVisible ? "checked" : ""}
          id="filter-item-income"
          name="filter-item-income"
          value="filter-item-income"
        />
        <label for="filter-item-income"></label>
        <div class="filter-item-income-label">수입</div>
        <div class="filter-item-income-amount filter-item-amount">${addCommaToNumber(
          monthlyIncomeSum
        )} 원</div>
      </li>
      <li class="filter-item">
        <input
          type="checkbox"
          ${isLedgerOutcomeVisible ? "checked" : ""}
          id="filter-item-outcome"
          name="filter-item-outcome"
          value="filter-item-outcome"
        />
        <label for="filter-item-outcome"></label>
        <div class="filter-item-outcome-label">지출</div>
        <div class="filter-item-outcome-amount filter-item-amount">${addCommaToNumber(
          monthlyOutcomeSum
        )} 원</div>
      </li>`;

    const $filter = $(`.${componentName}`);
    $filter.innerHTML = html;

    bindEvent("input#filter-item-income", "click", onIncomeFilterClick);
    bindEvent("input#filter-item-outcome", "click", onOutcomeFilterClick);
  }

  subscribe(componentName, "isLedgerOutcomeVisible", render);
  subscribe(componentName, "isLedgerIncomeVisible", render);
  subscribe(componentName, "ledgerItem", render);

  setTimeout(render, 0);

  return `<ul class=${componentName}></ul>`;
}
