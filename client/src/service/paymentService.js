import {
  getFetchManger,
  postFetchManger,
  deleteFetchManager,
} from "../util/fetchManager";

export async function getPaymentListFromServer() {
  return await getFetchManger("/payment");
}

export async function createNewPayment(newItem) {
  return await postFetchManger("/payment", newItem);
}

export async function deletePayment(p_id) {
  return await deleteFetchManager(`/payment/${p_id}`);
}
