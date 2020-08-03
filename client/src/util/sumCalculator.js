const { INCOME_TYPE, OUTCOME_TYPE } = require("./constant");

export function getDailyIncomeSum(records) {
  const incomeRecords = records.filter(
    (record) => record.t_type === INCOME_TYPE
  );
  const incomeSum =
    incomeRecords.length > 0
      ? incomeRecords.reduce((acc, cur) => acc + parseInt(cur.amount), 0)
      : 0;
  return incomeSum;
}

export function getDailyOutcomeSum(records) {
  const outcomeRecords = records.filter(
    (record) => record.t_type === OUTCOME_TYPE
  );
  const outcomeSum =
    outcomeRecords.length > 0
      ? outcomeRecords.reduce(
          (acc, cur) => acc + Math.abs(parseInt(cur.amount)),
          0
        )
      : 0;
  return outcomeSum;
}

export function getMonthlyIncomeSum(ledgerItem) {
  let monthlyIncomeSum = 0;
  Object.values(ledgerItem).forEach((dailyTransactions) => {
    dailyTransactions.forEach((tx) => {
      if (tx.t_type === INCOME_TYPE) {
        monthlyIncomeSum += parseInt(tx.amount);
      }
    });
  });
  return monthlyIncomeSum;
}

export function getMonthlyOutcomeSum(ledgerItem) {
  let monthlyOutcomeSum = 0;
  Object.values(ledgerItem).forEach((dailyTransactions) => {
    dailyTransactions.forEach((tx) => {
      if (tx.t_type === OUTCOME_TYPE) {
        monthlyOutcomeSum += parseInt(Math.abs(tx.amount));
      }
    });
  });
  return monthlyOutcomeSum;
}