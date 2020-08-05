import {
  getFetchManger,
  postFetchManger,
  deleteFetchManager,
  patchFetchManger,
} from "../util/fetchManager";

export async function getTransactionFromServer({ data }) {
  const { month, year } = data;
  return await getFetchManger(`/transaction/${year}-${month}}`);
}

export async function createTransactionFromServer(newItem) {
  return await postFetchManger("/transaction", newItem);
}

export async function patchTransactionFromServer(t_id) {
  return await patchFetchManger(`/transaction/${t_id}`);
}

export async function deleteTransactionFromServer(t_id) {
  return await deleteFetchManager(`/transaction/${t_id}`);
}
