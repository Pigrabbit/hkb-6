import "./Ledger.scss";
import LedgerItem from "./LedgerItem";
import { subscribe, getLedgerItemDate } from "../store";
import { $ } from "../util/util";

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

    const $ledger = $(`.${componentName}`);
    $ledger.innerHTML = html;
  }

  subscribe(componentName, "ledgerItem", render);

  setTimeout(render, 0);

  return `<article class=${componentName}></article>`;
}
