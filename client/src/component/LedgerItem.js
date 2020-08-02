import "./LedgerItem.scss";
import {
  subscribe,
  getLedgerItemByDate,
  getIsLedgerIncomeVisible,
  getIsLedgerOutcomeVisible,
} from "../store";
import { $ } from "../util/util";
import { INCOME_TYPE, OUTCOME_TYPE } from "../util/constant";

export default function LedgerItem(props, idx) {
  const componentName = `ledger-item`;

  function filterTransaction(records) {
    const isLedgerIncomeVisible = getIsLedgerIncomeVisible();
    const isLedgerOutcomeVisible = getIsLedgerOutcomeVisible();

    if (!isLedgerIncomeVisible) {
      records = records.filter((record) => record.t_type !== INCOME_TYPE);
    }

    if (!isLedgerOutcomeVisible) {
      records = records.filter((record) => record.t_type !== OUTCOME_TYPE);
    }

    return records;
  }

  function clearLedgerItem() {
    const $ledgerItem = $(`ul#${componentName + "-" + idx}`);
    $ledgerItem.innerHTML = "";
  }

  function getDailyIncomeSum(records) {
    const incomeRecords = records.filter((record) => record.t_type === INCOME_TYPE);
    const incomeSum =
      incomeRecords.length > 0
        ? incomeRecords.reduce((acc, cur) => acc + parseInt(cur.amount), 0)
        : 0;
    return incomeSum;
  }

  function getDailyOutcomeSum(records) {
    const outcomeRecords = records.filter((record) => record.t_type === OUTCOME_TYPE);
    const outcomeSum =
      outcomeRecords.length > 0
        ? outcomeRecords.reduce(
            (acc, cur) => acc + Math.abs(parseInt(cur.amount)),
            0
          )
        : 0;
    return outcomeSum;
  }

  function render() {
    let records = getLedgerItemByDate(props.date);
    // TODO
    // 마우스 오버 이벤트가 생기면 수정 버튼 만들기
    // 수정 버튼 눌렀을 때 현재 레코드의 내용을 input form에 default로 채워주기
    records = filterTransaction(records);

    if (records.length === 0) {
      clearLedgerItem();
      return;
    }

    const incomeSum = getDailyIncomeSum(records);
    const outcomeSum = getDailyOutcomeSum(records);

    const html = `
      <li class="ledger-item-header">
        <div class="ledger-item-header-date">${props.date}</div>
        <div class="ledger-item-header-amount">
          <p class="ledger-item-header-amount-income income-text">+${incomeSum} 원</p>
          <p class="ledger-item-header-amount-outcome outcome-text">-${outcomeSum} 원</p>
        </div>
      </li>
      ${records
        .map((record) => {
          return `
        <li class="ledger-item-record">
          <div class="record-category ${
            record.t_type === OUTCOME_TYPE ? "outcome-element" : "income-element"
          }">${record.category}</div>
          <div class="record-content">${record.content}</div>
          <div class="record-payment">${record.payment}</div>
          <div class="record-amount ${
            record.t_type === OUTCOME_TYPE ? "outcome-text" : "income-text"
          }">${
            record.t_type === INCOME_TYPE ? "+" + record.amount : record.amount
          } 원</div>
      </li>`;
        })
        .join("")}
  
        `;

    const $ledgerItem = $(`ul#${componentName + "-" + idx}`);
    $ledgerItem.innerHTML = html;
  }

  subscribe(componentName, "ledgerItem", render);
  subscribe(`${componentName}-${idx}`, "isLedgerIncomeVisible", render);
  subscribe(`${componentName}-${idx}`, "isLedgerOutcomeVisible", render);

  setTimeout(render, 0);

  return `<ul class=${componentName} id=${componentName + "-" + idx}></ul>`;
}
