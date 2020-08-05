import {
  getPaymentListFromServer,
  createNewPayment,
  deletePaymentFromServer,
} from "./service/paymentService";
import { fetchMockLedgerItem, fetchMockBarData } from "./Data";
import { $id, $all } from "./util/util";
import {
  createTransactionFromServer,
  getTransactionFromServer,
} from "./service/transactionService";

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
  isLedgerIncomeVisible: {
    data: true,
    listeners: {},
  },
  isLedgerOutcomeVisible: {
    data: true,
    listeners: {},
  },
  currentDate: {
    data: {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: new Date().getDate(),
    },
    listeners: {},
  },
  statistics: {
    data: [],
    listeners: {},
  },
};

export const subscribe = (component, key, action) => {
  state[key].listeners[component] = action;
};

export function unsubscribe(component, key) {
  delete state[key].listeners[component];
}

const publish = (key) =>
  Object.values(key.listeners).forEach((action) => {
    if (action) action(key.data);
  });

// 통계
export function fetchStatisticsData() {
  state.statistics.data = fetchMockBarData();
  publish(state.statistics);
}

export function getStatisticsData() {
  fetchStatisticsData();
  return state.statistics.data;
}

// 폼
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

// 결제수단

export async function addNewPayment(newPayment) {
  const data = { payment_name: newPayment };
  await createNewPayment(data);
  await fetchPaymentList();
  $id("modal-payment-name-input").value = "";
}

export async function deletePaymentById(p_id) {
  await deletePaymentFromServer(p_id);
  await fetchPaymentList();
}

function isNotInKey(x, data) {
  return Object.keys(data).find((elem) => elem === x) === undefined;
}

export async function fetchPaymentList() {
  state.paymentList.data = await getPaymentListFromServer();
  publish(state.paymentList);
}

export function getPaymentList() {
  return state.paymentList.data;
}

// 가계부

export async function addNewLedgeritem(date, newItem) {
  if (isNotInKey(date, state.ledgerItem.data))
    state.ledgerItem.data[date] = [newItem[date]];
  else state.ledgerItem.data[date].push(newItem[date]);

  const data = { ...newItem[date], created_at: date };
  await createTransactionFromServer(data);
  await fetchLedgerItem();
  // publish(state.ledgerItem);
  console.log(data);
  const inputs = $all(".form-input-text");
  inputs.forEach((input) => {
    input.value = "";
  });
}

export function getLedgerItemDate() {
  return Object.keys(state.ledgerItem.data);
}

export function getLedgerItemByDate(date) {
  return state.ledgerItem.data[date];
}

export function getLedgerItem() {
  return state.ledgerItem.data;
}

export async function fetchLedgerItem() {
  state.ledgerItem.data = await getTransactionFromServer(state.currentDate);
  console.log(state.ledgerItem.data);
  publish(state.ledgerItem);
}

export function getIsLedgerIncomeVisible() {
  return state.isLedgerIncomeVisible.data;
}

export function toggleLedgerIncomeVisible() {
  state.isLedgerIncomeVisible.data = !state.isLedgerIncomeVisible.data;
  publish(state.isLedgerIncomeVisible);
}

export function getIsLedgerOutcomeVisible() {
  return state.isLedgerOutcomeVisible.data;
}

export function toggleLedgerOutcomeVisible() {
  state.isLedgerOutcomeVisible.data = !state.isLedgerOutcomeVisible.data;
  publish(state.isLedgerOutcomeVisible);
}

//모달

export function getIsModalVisible() {
  return state.isModalVisible.data;
}
export function getIsAlertlVisible() {
  return state.isAlertVisible.data;
}

export function toggleAlertMsg() {
  state.isAlertVisible.data = !state.isAlertVisible.data;
  publish(state.isAlertVisible);
}

export function toggleModal() {
  state.isModalVisible.data = !state.isModalVisible.data;
  publish(state.isModalVisible);
}

// 달력

export function getCurrentDate() {
  return state.currentDate.data;
}

export function toPrevMonth() {
  if (state.currentDate.data.month === 1) {
    --state.currentDate.data.year;
    state.currentDate.data.month = 12;
  } else {
    --state.currentDate.data.month;
  }
  publish(state.currentDate);
}

export function toNextMonth() {
  if (state.currentDate.data.month === 12) {
    ++state.currentDate.data.year;
    state.currentDate.data.month = 1;
  } else {
    ++state.currentDate.data.month;
  }
  publish(state.currentDate);
}
