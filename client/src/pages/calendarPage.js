import Filter from "../component/Filter"
import Calendar from "../component/Calendar";
import Header from "../component/Header";
import Navbar from "../component/Navbar";

import brocolli from "../images/brocolli.png";

export default function CalendarPage() {

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