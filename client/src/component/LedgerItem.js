import "./LedgerItem.scss";
import { getLedgerItemByDate } from "../store";

export default function LedgerItem(props, idx) {
  const componentName = `ledger-item`;

  function render() {
    const records = getLedgerItemByDate(props.date);
    // TODO
    // 레코드에 맞도록 일간 수입, 지출 sum 계산
    // 레코드의 정렬 맞추기 -> scss
    // 수입/지출 여부에 따라 스타일(색상) 변경 -> scss
    // 마우스 오버 이벤트가 생기면 수정 버튼 만들기
    // 수정 버튼 눌렀을 때 현재 레코드의 내용을 input form에 default로 채워주기

    const incomeRecords = records.filter((record) => record.t_type === "수입");
    const incomeSum =
      incomeRecords.length > 0
        ? incomeRecords.reduce(
            (acc, cur) => acc + parseInt(cur.amount), 0)
        : 0;

    const outcomeRecords = records.filter((record) => record.t_type === "지출");
    const outcomeSum =
      outcomeRecords.length > 0
        ? outcomeRecords.reduce(
            (acc, cur) => acc + Math.abs(parseInt(cur.amount)), 0)
        : 0;

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
            (record.t_type === "지출") 
            ? "outcome-element"
            : "income-element"
          }">${record.category}</div>
          <div class="record-content">${record.content}</div>
        
          <div class="record-payment">${record.payment}</div>
          <div class="record-amount ${
            (record.t_type === "지출") 
            ? "outcome-text"
            : "income-text"
          }">${
            (record.t_type === "수입") 
            ? "+" + record.amount 
            : record.amount
          } 원</div>
        
      </li>`;
        })
        .join("")}
  
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
