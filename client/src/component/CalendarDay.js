import "./CalendarDay.scss";
import { $ } from "../util/util";
import { getLedgerItemByDate } from "../store";
import { INCOME_TYPE, OUTCOME_TYPE } from "../util/constant";

export default function CalendarDay(props) {
  const componentClass = "calendar-day";
  const componentName = `calendar-day-${props.month}-${props.day + 1}`;

  let { isToday, isPrevMonthDay, isNextMonthDay, year, month, day } = props;
  const isCurrentMonthDay = !(isPrevMonthDay || isNextMonthDay);

  isToday = isToday && (new Date().getFullYear() === year && new Date().getMonth() + 1 === month);

  const date = `${year}-${month < 10 ? `0${month}` : month}-${
    day < 9 ? `0${day + 1}` : day + 1
  }`;

  function getDailyIncomeSum(records) {
    const incomeRecords = records.filter(
      (record) => record.t_type === INCOME_TYPE
    );
    const incomeSum =
      incomeRecords.length > 0
        ? incomeRecords.reduce((acc, cur) => acc + parseInt(cur.amount), 0)
        : 0;
    return incomeSum;
  }

  function getDailyOutcomeSum(records) {
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

  function render() {
    let records = getLedgerItemByDate(date);

    let incomeSum;
    let outcomeSum;
    if (records) {
      incomeSum = getDailyIncomeSum(records);
      outcomeSum = getDailyOutcomeSum(records);
    }

    const html = `
            <div class="calendar-day-number">${props.day + 1}</div>
            <p class="calendar-day-income income-text ${
              isCurrentMonthDay && incomeSum ? "" : "hidden"
            }">+${incomeSum}원</p>
            <p class="calendar-day-outcome outcome-text ${
              isCurrentMonthDay && outcomeSum ? "" : "hidden"
            }">-${outcomeSum}원</p>
        `;

    const $calendarDay = $(`div#${componentName}`);
    $calendarDay.innerHTML = html;
  }

  setTimeout(render, 0);

  return `<div class="${componentClass}
            ${isToday ? "today" : ""}
            ${isPrevMonthDay ? "prev-month-day" : ""}
            ${isNextMonthDay ? "next-month-day" : ""}
            "
            id=${componentName}></div>`;
}
