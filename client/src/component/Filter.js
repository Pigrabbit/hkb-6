import "./Filter.scss";
import { bindEvent, $ } from "../util/util";
import { getIsLedgerIncomeVisible, getIsLedgerOutcomeVisible, toggleLedgerOutcomeVisible, toggleLedgerIncomeVisible, subscribe, getLedgerItem } from "../store";

export default function Filter() {
  const componentName = "filter";
  // TODO
  // 수입, 지출 체크박스 선택여부에 따라 store의 정보 toggle하기
  // 월간 수입, 지출 합계 구하기

  function onIncomeFilterClick(e) {
    toggleLedgerIncomeVisible();
  }

  function onOutcomeFilterClick(e) {
    toggleLedgerOutcomeVisible();
  }

  function render() {
    const isLedgerIncomeVisible = getIsLedgerIncomeVisible();
    const isLedgerOutcomeVisible = getIsLedgerOutcomeVisible();
    
    let monthlyIncomeSum = 0;
    let monthlyOutcomeSum = 0;

    const ledgerItemValues = Object.values(getLedgerItem());
    console.log(ledgerItemValues);

    ledgerItemValues.forEach(array => {
        array.forEach(item => {
          if (item.t_type === "수입") {
            monthlyIncomeSum += parseInt(item.amount);
          } else if (item.t_type === "지출") {
            monthlyOutcomeSum += parseInt(Math.abs(item.amount));
          }
        })
    })


    const html = ` 
    <li class="filter-item">
        <input
          type="checkbox"
          ${isLedgerIncomeVisible ? "checked": ""}
          id="filter-item-income"
          name="filter-item-income"
          value="filter-item-income"
        />
        <label for="filter-item-income"></label>
        <div class="filter-item-income-label">수입</div>
        <div class="filter-item-income-amount filter-item-amount">${monthlyIncomeSum} 원</div>
      </li>
      <li class="filter-item">
        <input
          type="checkbox"
          ${isLedgerOutcomeVisible ? "checked": ""}
          id="filter-item-outcome"
          name="filter-item-outcome"
          value="filter-item-outcome"
        />
        <label for="filter-item-outcome"></label>
        <div class="filter-item-outcome-label">지출</div>
        <div class="filter-item-outcome-amount filter-item-amount">${monthlyOutcomeSum} 원</div>
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
