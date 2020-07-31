import "./Ledger.scss";
import LedgerItem from "./LedgerItem";
import { subscribe, getLedgerItemDate } from "../store";

export default function Ledger() {
  const componentName = "ledger";

  function render() {
    const ledgerDate = getLedgerItemDate();
    const html = `
      ${ledgerDate
        .map((date, idx) => {
          return LedgerItem({ date }, idx);
        })
        .join("")}
    `;

    const $ledger = document.querySelector(`.${componentName}`);
    $ledger.innerHTML = html;

    // bindEvent("", "", )
  }

  subscribe(componentName, "ledgerItem", render);
  setTimeout(render, 0);

  return `<article class=${componentName}></article>`;
}
