import "./Modal.scss";
import { subscribe, getIsModalVisible, getPaymentList } from "../store";

export default function Modal() {
  const componentName = "modal";

  function render() {
    const isVisible = getIsModalVisible();
    const paymentList = getPaymentList();

    const html = `
    <div class="${componentName} ${isVisible ? "" : "hidden"}">
    <div class="modal-overlay"></div>
      <div class="modal-content">
        <header class="modal-content-header">
          <h1>결제 수단 관리</h1>
          <button class="modal-close-btn">x</button>
        </header>
        <section>
          <form class="modal-payment-form">
            <label for="modal-payment-name">결제 수단 이름</label>
            <input
              type="text"
              name="modal-payment-name-input"
              id="modal-payment-name-input"
            />
            <button class="modal-payment-submit-btn">등록</button>
          </form>
          <ul class="modal-payment-list">
          ${paymentList
            .map((item) => {
              return `
            <li class="modal-payment-item">
              <p class="modal-payment-item-name">${item.payment_name}</p>
              <button class="modal-payment-delete-btn">x</button>
            </li>
            `;
            })
            .join("")}
          </ul>
        </section>
      </div>
    `;

    const $modal = document.querySelector(`.${componentName}-wrapper`);
    $modal.innerHTML = html;

    // bindEvent("", "", )
  }

  subscribe(componentName, "isModalVisible", render);
  setTimeout(render, 0);

  return `<div class=${componentName}-wrapper></div>`;
}
