export const state = {
  isModalVisible: {
    data: false,
    listeners: {},
  },
  isFormIncomeSelected: {
    data: false,
    listeners: {},
  },
  isFormOutcomeSelected: {
    data: true,
    listeners: {},
  },

  ledgerItem: {
    data: {
      "2020-07-30": [
        {
          category: "쇼핑/뷰티",
          content: "미용실",
          payment: "현대카드",
          amount: "-20000",
        },
        {
          category: "쇼핑/뷰티",
          content: "미용실",
          payment: "현대카드",
          amount: "-20000",
        },
      ],
      "2020-07-29": [
        {
          category: "식품",
          content: "편의점",
          payment: "우리카드",
          amount: "-1000",
        },
      ],
    },
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

export function getIsFormIncomeSelected() {
  return state.isFormIncomeSelected.data;
}
export function getIsFormOutcomeSelected() {
  return state.isFormOutcomeSelected.data;
}
export function toggleFormBtns() {
  state.isFormIncomeSelected.data = !state.isFormIncomeSelected.data;
  state.isFormOutcomeSelected.data = !state.isFormOutcomeSelected.data;

  publish(state.isFormIncomeSelected);
  publish(state.isFormOutcomeSelected);
}

export function addNewLedgeritem(date, data) {
  if (isDateInKey(date)) state.ledgerItem.data[date] = [data[date]];
  else state.ledgerItem.data[date].push(data[date]);
  publish(state.ledgerItem);
}

function isDateInKey(date) {
  return (
    Object.keys(state.ledgerItem.data).find((key) => key === date) === undefined
  );
}

export function getLedgerItem() {
  return state.ledgerItem.data;
}

export function getLedgerItemDate() {
  return Object.keys(state.ledgerItem.data);
}

export function getLedgerItemByDate(date) {
  return state.ledgerItem.data[date];
}

export function getIsModalVisible() {
  return state.isModalVisible.data;
}

export function toggleModal() {
  state.isModalVisible.data = !state.isModalVisible.data;
  publish(state.isModalVisible);
}

export function fetchPaymentList() {
  return new Promise((resolve, reject) => {
    fetch("http://localhost:3000/api/payment", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        resolve(data);
      })
      .catch((err) => reject(err));
  });
}

export function getPaymentList() {
  fetchPaymentList().then((data) => (state.paymentList.data = data));
  return state.paymentList.data;
}
