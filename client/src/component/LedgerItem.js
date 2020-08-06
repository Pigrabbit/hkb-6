import "./LedgerItem.scss";
import {
  subscribe,
  getLedgerItemByDate,
  getIsLedgerIncomeVisible,
  getIsLedgerOutcomeVisible,
  unsubscribe,
  setToUpdateTransaction,
} from "../store";
import { $, getNextPageURI, bindEventAll } from "../util/util";
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

  function onMouseLeave(e) {
    e.target.classList.remove("on-mouse-over");
    e.target.querySelector("button.record-update-btn").classList.add("hidden");
  }

  function onUpdateBtnClick(e) {
    const $ledgerItemRecord = e.target.closest("li.ledger-item-record");
    const t_id = e.target.id.toString().split("-").pop();

    const $ledgerItem = e.target.closest("ul.ledger-item");
    const date = $ledgerItem.querySelector("div.ledger-item-header-date").innerText;

    const targetTransaction = getLedgerItemByDate(date).find(item => item.t_id === parseInt(t_id));
    
    const {category, content, payment_name, t_type } = targetTransaction;

    const $amount = $ledgerItemRecord.querySelector("div.record-amount");
    const amount = $amount.innerText.toString().replace(/^(\-|\+)/, "").split(" ")[0];

    setToUpdateTransaction({t_id, category, content, payment_name, amount, date, t_type });
  }

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
          <button class="record-update-btn hidden" id=record-update-btn-${record.t_id}>
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

    bindEventAll("li.ledger-item-record", "mouseleave", onMouseLeave);
    bindEventAll("button.record-update-btn", "click", onUpdateBtnClick);
  }

  subscribe(`${componentId}`, "isLedgerIncomeVisible", render);
  subscribe(`${componentId}`, "isLedgerOutcomeVisible", render);

  setTimeout(render, 0);

  return `<ul class=${componentClass} id=${componentId}></ul>`;
}
