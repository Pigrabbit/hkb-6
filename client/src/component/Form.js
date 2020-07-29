import "./Form.scss";

export default function Form() {
  const componentName = "form";

  function render() {
    const html = `
        <div class="form-row">
            <div class="form-col">
              <label for="inout">분류</label>
              <button>수입</button>
              <button>지출</button>
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
  }

  // subscribe(componentName, "", );
  setTimeout(render, 0);

  return `<form class=${componentName}></form>`;
}
