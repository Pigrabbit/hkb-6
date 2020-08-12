import { getFetchManger } from "../util/fetchManager";

export async function fetchStatisticsByDate(date) {
    const { year, month } = date;
    return await getFetchManger(`/statistics/${year}-${month}`);
}
