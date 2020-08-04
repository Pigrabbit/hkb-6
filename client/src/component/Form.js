import "./Form.scss";
import { bindEventAll, bindEvent, $, $id } from "../util/util";
import {
  subscribe,
  addNewLedgeritem,
  getIsFormIncomeSelected,
  getIsFormOutcomeSelected,
  toggleFormBtns,
  getPaymentList,
  unsubscribe,
} from "../store";
import {
  isNumber,
  attachComma,
  showAlertMessage,
  removeComma,
  isNormalText,
} from "../util/validation";
import {
  INCOME_CATEGORY,
  OUTCOME_CATEGORY,
  OUTCOME_TYPE,
  INCOME_TYPE,
} from "../util/constant";

export default function Form() {
  const componentName = "form";

  function onPopState() {
    const nextPage = location.pathname.toString().replace(/^\//, "");
    if (nextPage === "list") return;

    unsubscribe(componentName, "paymentList");
    unsubscribe(componentName, "isFormIncomeSelected", render);
    unsubscribe(componentName, "isFormOutcomeSelected", render);
  }

  window.addEventListener("popstate", onPopState.bind(this));

  // 수입, 지출 버튼 토글하는 함수
  function btnToggle(e) {
    if (e.target.classList.contains("category-btn-income-clicked")) return;
    if (e.target.classList.contains("category-btn-outcome-clicked")) return;
    toggleFormBtns();
  }

  //각 버튼들의 기본 동작을 막아주는 함수
  function preventDefaultBtn(e) {
    e.preventDefault();
  }

  //엔터 입력시 새로운 가계부 제출하는 기능 구현
  function submitByEnter(e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      $(".form-submit-btn").click();
    }
  }

  //새로운 가계부를 입력하도록 form을 제출하는 함수
  function submitForm() {
    const $form = $(".form");
    const alertMsg = $id("alert-msg");
    alertMsg.innerText = "";

    const $inputElements = [
      ...$form.querySelectorAll("input:not(#transaction-date),select"),
    ];

    // 아직 입력하지 않은 부분이 있다면 관련 알림 메세지를 표시하고 포커스를 이동시킵니다.
    let curdate = $id("transaction-date");
    if (curdate.value === "" || curdate.value === "undefined") {
      showAlertMessage(curdate, alertMsg, "날짜를 입력해주세요");
      return;
    }
    let passed = true;
    $inputElements.forEach((element) => {
      if (passed && (element.value === "" || element.value === "default")) {
        passed = false;
        showAlertMessage(
          element,
          alertMsg,
          `${element.getAttribute("msg")}를 입력해주세요.`
        );
      }
    });
    if (!passed) return;

    // 폼을 제출할 때 금액과 내용의 유효성 검사 다시 실행해서 유효하지 않으면 ledgeritem 추가 불가
    if (!amountValidationCheck()) return;
    if (!contentValidationCheck()) return;

    // 유효성 검사가 완료되면 가계부 리스트에 추가합니다
    const tmp = {};
    tmp[curdate.value] = {};
    $inputElements.forEach((element) => {
      const id = element.id.toString().split("-")[1];
      tmp[curdate.value][id] = element.value;
    });
    const isFormOutcomeSelected = getIsFormOutcomeSelected();
    let absoluteAmount = removeComma(tmp[curdate.value]["amount"]);
    tmp[curdate.value]["amount"] = isFormOutcomeSelected
      ? -absoluteAmount
      : +absoluteAmount;
    tmp[curdate.value]["t_type"] = isFormOutcomeSelected
      ? OUTCOME_TYPE
      : INCOME_TYPE;
    addNewLedgeritem(curdate.value, tmp);
  }

  //금액 유효성 검사 함수
  function amountValidationCheck() {
    const $amount = $id("transaction-amount");
    const inputtedString = removeComma($amount.value);
    const alertMsg = $id("alert-msg");
    alertMsg.innerText = "";
    if (!isNumber(inputtedString)) {
      showAlertMessage($amount, alertMsg, "숫자로만 입력할 수 있습니다.");
      return false;
    }
    if (inputtedString.length > 12) {
      showAlertMessage($amount, alertMsg, "숫자가 너무 큽니다");
      return false;
    }
    attachComma($amount, $amount.value);
    return true;
  }

  //내용 유효성 검사 함수
  function contentValidationCheck() {
    const $content = $id("transaction-content");
    const alertMsg = $id("alert-msg");
    alertMsg.innerText = "";
    if (!isNormalText($content.value)) {
      showAlertMessage(
        $content,
        alertMsg,
        "내용에 - , / ^ 공백문자 외의 특수기호를 사용할 수 없습니다."
      );
      return false;
    }

    if ($content.value.length > 50) {
      showAlertMessage($content, alertMsg, "50글자 이상 입력할 수 없습니다.");
      return false;
    }
    return true;
  }

  function render() {
    const isFormIncomeSelected = getIsFormIncomeSelected();
    const isFormOutcomeSelected = getIsFormOutcomeSelected();
    const paymentList = getPaymentList();

    const html = `
        <div class="form-row">
            <div class="form-col">
              <label for="inout">분류</label>
              <button class="form-income-btn ${
                isFormIncomeSelected ? "category-btn-income-clicked" : ""
              }">수입</button>
              <button class="form-outcome-btn ${
                isFormOutcomeSelected ? "category-btn-outcome-clicked" : ""
              }">지출</button>
            </div>
          </div>
          <div class="form-row">
            <div class="form-col-2">
              <label for="form-date">날짜</label>
              <input
                type="date"
                name="transaction-date"
                id="transaction-date"
              />
            </div>
            <div class="form-col-2">
              <label for="form-category">카테고리</label>
              <select name="transaction-category" id="transaction-category" msg="카테고리">
                <option value="default">선택하세요</option>
                  ${
                    isFormIncomeSelected
                      ? INCOME_CATEGORY.map((category) => {
                          return `<option value=${category}>${category}</option>`;
                        }).join("")
                      : OUTCOME_CATEGORY.map((category) => {
                          return `<option value=${category}>${category}</option>`;
                        }).join("")
                  }
              </select>
            </div>
            <div class="form-col-2">
              <label for="form-payment">결제수단</label>
              <select name="transaction-payment" id="transaction-payment" msg="결제수단">
                <option value="default">선택하세요</option>
                ${paymentList.map((item) => {
                  return `<option value="${item.payment_name}">${item.payment_name}</option>`;
                })}

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
                msg="금액"
              /> 원
            </div>
            <div class="form-col">
              <label for="form-content">내용</label>
              <input
                type="text"
                class="form-input-text"
                id="transaction-content"
                placeholder="내용을 입력하세요"
                msg="내용"
              />
            </div>
          </div>
          <div id="alert-msg" class="form-row"></div>
          <button class="form-submit-btn">확인</button>
        `;

    const $form = $(`.${componentName}`);
    $form.innerHTML = html;

    bindEventAll("button", "click", preventDefaultBtn);
    bindEvent("button.form-income-btn", "click", btnToggle);
    bindEvent("button.form-outcome-btn", "click", btnToggle);
    bindEvent("input#transaction-amount", "input", amountValidationCheck);
    bindEvent("input#transaction-content", "input", contentValidationCheck);
    bindEvent("input#transaction-content", "keyup", submitByEnter);
    bindEvent("button.form-submit-btn", "click", submitForm);
  }

  subscribe(componentName, "paymentList", render);
  subscribe(componentName, "isFormIncomeSelected", render);
  subscribe(componentName, "isFormOutcomeSelected", render);

  setTimeout(render, 0);

  return `<form class=${componentName} onkeydown="return event.key != 'Enter';"></form>`;
}
