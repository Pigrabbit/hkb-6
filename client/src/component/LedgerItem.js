import "./LedgerItem.scss";

export default function LedgerItem(props, idx) {
  const componentName = `ledger-item`;

  function render() {
    const html = `
      <li class="ledger-item-header">
        <div class="ledger-item-header-date">6월 16일 화</div>
        <div class="ledger-item-header-amount">
          <p class="ledger-item-header-amount-income">+0원</p>
          <p class="ledger-item-header-amount-outcome">-26000원</p>
        </div>
      </li>
      <li class="ledger-item-record">
        <div class="ledger-item-record-col">
          <div class="record-category">${props.category}</div>
          <div class="record-content">${props.content}</div>
        </div>
        <div class="ledger-item-record-col">
          <div class="record-payment">${props.payment}</div>
          <div class="record-amount">${props.amount}</div>
        </div>
      </li>
        `;

    const $ledgerItem = document.querySelector(`ul#${componentName + "-" + idx}`);
    $ledgerItem.innerHTML = html;

    // bindEvent("", "", )
  }

  // subscribe(componentName, "", );
  setTimeout(render, 0);

  return `<ul class=${componentName} id=${componentName + "-" + idx}></ul>`;
}
