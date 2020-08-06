import Filter from "../component/Filter"
import Calendar from "../component/Calendar";
import Header from "../component/Header";
import Navbar from "../component/Navbar";

import brocolli from "../images/brocolli.png";
import { fetchLedgerItem } from "../store";

export default function CalendarPage() {
    fetchLedgerItem();

    return `
    ${Header({ isPaymentVisible: false })}
    ${Navbar()}
    <section class="container">
        ${Filter()}
        ${Calendar()}
    </section>
    <img id="brocolli" alt="브로콜리" src=${brocolli}/>
    `;
}