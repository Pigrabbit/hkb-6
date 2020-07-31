import "./Form.scss";
import { bindEventAll, bindEvent } from "../util/util";
import {
  subscribe,
  addNewLedgeritem,
  getIsFormIncomeSelected,
  getIsFormOutcomeSelected,
  toggleFormBtns,
} from "../store";

export default function Form() {
  const componentName = "form";

  function btnToggle(e) {
    toggleFormBtns();
  }

  function preventDefaultBtn(e) {
    e.preventDefault();
  }

  function submitForm(e) {
    if (e.target.classList.contains("form-submit-btn")) {
      const $form = document.querySelector(".form");
      const $inputElements = [
        ...$form.querySelectorAll("input:not(#transaction-date),select"),
      ];
      let curdate = document.getElementById("transaction-date").value;
      const tmp = {};
      tmp[curdate] = {};
      $inputElements.forEach((element) => {
        const id = element.id.toString().split("-")[1];
        tmp[curdate][id] = element.value;
      });
      const isFormOutcomeSelected = getIsFormOutcomeSelected();
      let absoluteAmount = tmp[curdate]["amount"];
      absoluteAmount = isFormOutcomeSelected
        ? -absoluteAmount
        : +absoluteAmount;
      addNewLedgeritem(curdate, tmp);
    }
  }

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function attachComma(e) {
    const inputtedString = e.target.value.replace(/,/g, "");
    if (!isNumber(string)) {
      const amountField = document.getElementById("transaction-amount");
      amountField.value = "";
      amountField.focus();
      return;
    }
    e.target.value = numberWithCommas(inputtedString);
  }

  function isNumber(x) {
    return /^\d+$/.test(x);
  }

  function render() {
    const isFormIncomeSelected = getIsFormIncomeSelected();
    const isFormOutcomeSelected = getIsFormOutcomeSelected();
    const html = `
        <div class="form-row">
            <div class="form-col">
              <label for="inout">분류</label>
              <button class="form-income-btn ${
                isFormIncomeSelected ? "category-btn-clicked" : ""
              }">수입</button>
              <button class="form-outcome-btn ${
                isFormOutcomeSelected ? "category-btn-clicked" : ""
              }">지출</button>
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
                placeholder="1,000"
              /> 원
            </div>
            <div class="form-col">
              <label for="form-content">내용</label>
              <input
                type="text"
                class="form-input-text"
                id="transaction-content"
                placeholder="내용을 입력하세요"
              />
            </div>
          </div>
          <button class="form-submit-btn">확인</button>
        `;

    const $form = document.querySelector(`.${componentName}`);
    $form.innerHTML = html;
    bindEventAll("button", "click", preventDefaultBtn);
    bindEvent("button.form-income-btn", "click", btnToggle);
    bindEvent("button.form-outcome-btn", "click", btnToggle);
    bindEvent("input.form-input-text", "input", attachComma);
    bindEventAll("button", "click", submitForm);
  }

  subscribe(componentName, "isFormIncomeSelected", render);
  subscribe(componentName, "isFormOutcomeSelected", render);

  setTimeout(render, 0);

  return `<form class=${componentName}></form>`;
}
