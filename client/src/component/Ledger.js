import "./Ledger.scss";
import LedgerItem from "./LedgerItem";
import { subscribe, getLedgerItemDate, unsubscribe } from "../store";
import { $, getNextPageURI, bindEvent } from "../util/util";

export default function Ledger() {
  const componentName = "ledger";
  
  function onPopState() {
    const nextPageURI = getNextPageURI();
    if (nextPageURI === "list") return;
    unsubscribe(componentName, "ledgerItem");
  }

  function onMouseOver(e) {
    console.log(e.target.closest("li.ledger-item-record"));
    if (e.target.closest("ledger.item-record")) {
      console.log(e.target)
    }
  }

  window.addEventListener("popstate", onPopState.bind(this));
  
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

    bindEvent(`article.${componentName}`, "mouseover", onMouseOver);
  }

  subscribe(componentName, "ledgerItem", render);

  setTimeout(render, 0);

  return `<article class=${componentName}></article>`;
}
