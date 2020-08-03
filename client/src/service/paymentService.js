import {
  getFetchManger,
  postFetchManger,
  deleteFetchManager,
  patchFetchManger,
} from "../util/fetchManager";

export async function getPaymentListFromServer() {
  return await getFetchManger("/payment");
}

export async function createNewPayment(newItem) {
  return await postFetchManger("/payment", newItem);
}


