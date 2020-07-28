import "./LedgerItem.scss";

export default function LedgerItem() {
  const componentName = "ledger-item";

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
          <div class="record-category">쇼핑/뷰티</div>
          <div class="record-content">미용실</div>
        </div>
        <div class="ledger-item-record-col">
          <div class="record-payment">현대카드</div>
          <div class="record-amount">-20000원</div>
        </div>
      </li>
        `;

    const $ledgerItem = document.querySelector(`.${componentName}`);
    $ledgerItem.innerHTML = html;

    // bindEvent("", "", )
  }

  // subscribe(componentName, "", );
  setTimeout(render, 0);

  return `<ul class=${componentName}></ul>`;
}
