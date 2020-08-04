import Form from "../component/Form";
import Filter from "../component/Filter";
import Ledger from "../component/Ledger";
import Header from "../component/Header";
import Modal from "../component/Modal";
import Navbar from "../component/Navbar";

import brocolli from "../images/brocolli.png";
import { fetchPaymentList, fetchLedgerItem } from "../store";

export default function ListPage() {
    fetchLedgerItem();
    fetchPaymentList();

    return `
    ${Header({ isPaymentVisible: true })}
    ${Navbar()}
    <section class="container">
        ${Form()}
        ${Filter()}
        ${Ledger()}
    </section>
    ${Modal()}
    <img id="brocolli" alt="브로콜리" src=${brocolli}/>
    `;
}