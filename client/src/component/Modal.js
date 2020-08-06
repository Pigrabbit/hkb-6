import "./Modal.scss";
import {
  subscribe,
  getIsModalVisible,
  getPaymentList,
  toggleModal,
  addNewPayment,
  deletePaymentById,
  unsubscribe,
} from "../store";
import { bindEvent, $id, bindEventAll, getNextPageURI } from "../util/util";

export default function Modal() {
  const componentName = "modal";

  function onPopState() {
    const nextPageURI = getNextPageURI();
    if (nextPageURI === "list") return;

    unsubscribe(componentName, "isModalVisible");
    unsubscribe(componentName, "paymentList");
  }
  window.addEventListener("popstate", onPopState.bind(this));

  function onCloseBtnClick() {
    toggleModal();
  }

  async function registerPayment(e) {
    e.preventDefault();
    const $input = $id("modal-payment-name-input");
    await addNewPayment($input.value);
  }

  async function deletePayment(e) {
    const p_id = e.target.closest("li").id;
    await deletePaymentById(p_id);
  }

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
            <li id="${item.payment_id}" class="modal-payment-item">
              <i class="fa fa-chevron-right" aria-hidden="true"></i>
              <p class="modal-payment-item-name">${item.payment_name}</p>
              <button class="modal-payment-delete-btn"><i class="fa fa-times" aria-hidden="true"></i></button>
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

    bindEvent("button.modal-close-btn", "click", onCloseBtnClick);
    bindEvent("button.modal-payment-submit-btn", "click", registerPayment);
    bindEventAll("i.fa-times", "click", deletePayment);
  }

  subscribe(componentName, "isModalVisible", render);
  subscribe(componentName, "paymentList", render);
  setTimeout(render, 0);

  return `<div class=${componentName}-wrapper></div>`;
}
