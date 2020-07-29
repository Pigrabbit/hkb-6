export const state = {
  isModalVisible: {
    data: true,
    listeners: {},
  },
  ledgerItem: {
    data: [
      {
        category: "쇼핑/뷰티",
        content: "미용실",
        payment: "현대카드",
        amount: "-20000원",
      },
      {
        category: "식품",
        content: "편의점",
        payment: "우리카드",
        amount: "-1000원",
      },
    ], // [{}, {}, {}]
    listeners: {},
  },
  paymentList: {
    data: [],
    listeners: {},
  },
};

export const subscribe = (component, key, eventHandler) => {
  state[key].listeners[component] = eventHandler;
};

const publish = (key) =>
  Object.values(key.listeners).forEach((eventHandler) =>
    eventHandler(key.data)
  );

export function getLedgerItem() {
  return state.ledgerItem.data;
}

export function getIsModalVisible() {
  return state.isModalVisible.data;
}

export function fetchPaymentList() {
  fetch("http://localhost:3000/api/payment", {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      state.paymentList.data = data;
    });
}

export function getPaymentList() {
  return state.paymentList.data;
}
