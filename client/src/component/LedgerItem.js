import "./LedgerItem.scss";
import { getLedgerItemByDate } from "../store";

export default function LedgerItem(props, idx) {
  const componentName = `ledger-item`;

  function render() {
    const records = getLedgerItemByDate(props.date);

    const html = `
      <li class="ledger-item-header">
        <div class="ledger-item-header-date">${props.date}</div>
        <div class="ledger-item-header-amount">
          <p class="ledger-item-header-amount-income">+0원</p>
          <p class="ledger-item-header-amount-outcome">-26000원</p>
        </div>
      </li>
      ${records.map((record) => {
        return `
        <li class="ledger-item-record">
        <div class="ledger-item-record-col">
          <div class="record-category">${record.category}</div>
          <div class="record-content">${record.content}</div>
        </div>
        <div class="ledger-item-record-col">
          <div class="record-payment">${record.payment}</div>
          <div class="record-amount">${record.amount}원</div>
        </div>
      </li>`;
      })}
  
        `;

    const $ledgerItem = document.querySelector(
      `ul#${componentName + "-" + idx}`
    );
    $ledgerItem.innerHTML = html;

    // bindEvent("", "", )
  }

  // subscribe(componentName, "", );
  setTimeout(render, 0);

  return `<ul class=${componentName} id=${componentName + "-" + idx}></ul>`;
}
