import "./Ledger.scss";
import LedgerItem from "./LedgerItem";

export default function Ledger() {
    const componentName = "ledger";


    function render() {
        const html = `${LedgerItem()}`;

        const $ledger = document.querySelector(`.${componentName}`);
        $ledger.innerHTML = html

        // bindEvent("", "", )
    }

    // subscribe(componentName, "", );
    setTimeout(render, 0);

    return `<article class=${componentName}></article>`;
}