import "./LedgerItem.scss";
import {
  subscribe,
  getLedgerItemByDate,
  getIsLedgerIncomeVisible,
  getIsLedgerOutcomeVisible,
  unsubscribe,
} from "../store";
import { $, getNextPageURI } from "../util/util";
import { INCOME_TYPE, OUTCOME_TYPE } from "../util/constant";
import { getDailyIncomeSum, getDailyOutcomeSum } from "../util/sumCalculator";
import { addCommaToNumber } from "../util/validation";

export default function LedgerItem(props, idx) {
  const componentClass = `ledger-item`;
  const componentId = `${componentClass}-${idx}`;

  function onPopState() {
    const nextPageURI = getNextPageURI();
    if (nextPageURI === "list") return;

    unsubscribe(componentClass, "ledgerItem");
    unsubscribe(componentId, "isLedgerIncomeVisible");
    unsubscribe(componentId, "isLedgerOutcomeVisible");
  }

  window.addEventListener("popstate", onPopState.bind(this));

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
    const $ledgerItem = $(`ul#${componentId}`);
    $ledgerItem.innerHTML = "";
  }

  function render() {
    let records = getLedgerItemByDate(props.date);
    // TODO
    // 마우스 오버 이벤트가 생기면 수정 버튼 만들기
    // 수정 버튼 눌렀을 때 현재 레코드의 내용을 input form에 default로 채워주기
    records = filterTransaction(records);

    if (!records || records.length === 0) {
      clearLedgerItem();
      return;
    }

    const incomeSum = getDailyIncomeSum(records);
    const outcomeSum = getDailyOutcomeSum(records);

    const isLedgerIncomeVisible = getIsLedgerIncomeVisible();
    const isLedgerOutcomeVisible = getIsLedgerOutcomeVisible();

    const html = `
      <li class="ledger-item-header">
        <div class="ledger-item-header-date">${props.date}</div>
        <div class="ledger-item-header-amount">
          <p class="ledger-item-header-amount-income income-text
           ${isLedgerIncomeVisible ? "" : "hidden"}">+${addCommaToNumber(
      incomeSum
    )} 원</p>
          <p class="ledger-item-header-amount-outcome outcome-text
           ${isLedgerOutcomeVisible ? "" : "hidden"}">-${addCommaToNumber(
      outcomeSum
    )} 원</p>
        </div>
      </li>
      ${records
        .map((record) => {
          return `
        <li class="ledger-item-record" id=${record.t_id}>
          <div class="record-category ${
            record.t_type === OUTCOME_TYPE
              ? "outcome-element"
              : "income-element"
          }">${record.category}</div>
          <div class="record-content">${record.content}</div>
          <button class="record-update-btn hidden">
            Edit
          </button>
          <div class="record-payment">${record.payment_name}</div>
          <div class="record-amount ${
            record.t_type === OUTCOME_TYPE ? "outcome-text" : "income-text"
          }">${
            record.t_type === INCOME_TYPE
              ? "+" + addCommaToNumber(record.amount)
              : addCommaToNumber(record.amount)
          } 원</div>
      </li>`;
        })
        .join("")}
  
        `;

    const $ledgerItem = $(`ul#${componentId}`);
    $ledgerItem.innerHTML = html;
  }

  subscribe(`${componentId}`, "isLedgerIncomeVisible", render);
  subscribe(`${componentId}`, "isLedgerOutcomeVisible", render);

  setTimeout(render, 0);

  return `<ul class=${componentClass} id=${componentId}></ul>`;
}
