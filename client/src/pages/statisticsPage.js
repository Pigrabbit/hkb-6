import Header from "../component/Header";
import Navbar from "../component/Navbar";

import brocolli from "../images/brocolli.png";

export default function StatisticsPage() {

    return `
    ${Header({ isPaymentVisible: false })}
    ${Navbar()}
    <section class="container">
        <div class="statistics">
            This is statistics page
        </div>
    </section>
    <img id="brocolli" alt="브로콜리" src=${brocolli}/>
    `;
}