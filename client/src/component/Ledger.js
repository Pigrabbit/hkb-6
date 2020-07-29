import "./Ledger.scss";
import LedgerItem from "./LedgerItem";
import { getLedgerItem } from "../store";

export default function Ledger() {
  const componentName = "ledger";

  function render() {
    const ledgerItem = getLedgerItem();
    // console.log(ledgerItem);
    const html = `
            ${ledgerItem
              .map((item, idx) => {
                return LedgerItem(item, idx);
              })
              .join("")}
        `;
    // const html = `${LedgerItem()}`;

    const $ledger = document.querySelector(`.${componentName}`);
    $ledger.innerHTML = html;

    // bindEvent("", "", )
  }

  // subscribe(componentName, "", );
  setTimeout(render, 0);

  return `<article class=${componentName}></article>`;
}
