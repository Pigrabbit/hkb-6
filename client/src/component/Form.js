import "./Form.scss";
import { bindEventAll } from "../util/util";
import { addNewLedgeritem } from "../store";

export default function Form() {
  const componentName = "form";
  let isPositive = true;
  function preventDefaultBtn(e) {
    e.preventDefault();
    if (e.target.classList.contains("income")) {
      positive = true;
    }
    if (e.target.classList.contains("outcome")) {
      positive = false;
    }

    if (e.target.classList.contains("form-submit-btn")) {
      let curdate = document.getElementById("transaction-date").value;
      let category = document.getElementById("transaction-category").value;
      let payment = document.getElementById("transaction-payment").value;
      let amount = document.getElementById("transaction-amount").value;
      let content = document.getElementById("transaction-content").value;
      console.log(curdate);
      const data = {};
      data[curdate] = { category, payment, amount, content };

      // console.log(data);
      addNewLedgeritem(curdate, data);
    }
  }

  function render() {
    const html = `
        <div class="form-row">
            <div class="form-col">
              <label for="inout">분류</label>
              <button class="form-income-btn">수입</button>
              <button class="form-outcome-btn">지출</button>
            </div>
          </div>
          <div class="form-row">
            <div class="form-col">
              <label for="form-date">날짜</label>
              <input
                type="date"
                name="transaction-date"
                id="transaction-date"
              />
            </div>
            <div class="form-col">
              <label for="form-category">카테고리</label>
              <select name="transaction-category" id="transaction-category">
                <option value="default">선택하세요</option>
                <option value="월급">월급</option>
                <option value="용돈">용돈</option>
                <option value="기타수입">기타수입</option>
              </select>
            </div>
            <div class="form-col">
              <label for="form-payment">결제수단</label>
              <select name="transaction-payment" id="transaction-payment">
                <option value="default">선택하세요</option>
                <option value="우리카드">우리카드</option>
                <option value="카카오체크카드">카카오체크카드</option>
                <option value="국민은행">국민은행</option>
              </select>
            </div>
          </div>
          <div class="form-row">
            <div class="form-col">
              <label for="form-amount">금액</label>
              <input
                type="text"
                class="form-input-text"
                id="transaction-amount"
              />
            </div>
            <div class="form-col">
              <label for="form-content">내용</label>
              <input
                type="text"
                class="form-input-text"
                id="transaction-content"
              />
            </div>
          </div>
          <button class="form-submit-btn">확인</button>
        `;

    const $form = document.querySelector(`.${componentName}`);
    $form.innerHTML = html;

    // bindEvent("", "", )
    bindEventAll("button", "click", preventDefaultBtn);
  }

  // subscribe(componentName, "", );
  setTimeout(render, 0);

  return `<form class=${componentName}></form>`;
}
