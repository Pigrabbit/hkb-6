import { getPaymentListFromServer } from "./service/paymentService"
import { fetchMockLedgerItem } from "./Data";

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
    data: {},
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

export async function fetchPaymentList() {
  state.paymentList.data = await getPaymentListFromServer();
  publish(state.paymentList);
}

export function getPaymentList() {
  return state.paymentList.data;
}

export function fetchLedgerItem() {
  state.ledgerItem.data = fetchMockLedgerItem();
  publish(state.ledgerItem);
}
