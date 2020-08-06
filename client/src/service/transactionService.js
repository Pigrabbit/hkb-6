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

export async function createTransaction(newItem) {
  return await postFetchManger("/transaction", newItem);
}

export async function updateTransaction(t_id, editedItem) {
  return await patchFetchManger(`/transaction/${t_id}`, editedItem);
}

export async function deleteTransaction(t_id) {
  return await deleteFetchManager(`/transaction/${t_id}`);
}
