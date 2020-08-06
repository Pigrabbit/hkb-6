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
    if (e.target.closest("li.ledger-item-record")) {
      const targetRecord = e.target.closest("li.ledger-item-record");
      // 마우스 오버 이벤트가 생기면 수정 버튼 보여주기 (default: hidden)

      targetRecord.classList.add("on-mouse-over");
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
