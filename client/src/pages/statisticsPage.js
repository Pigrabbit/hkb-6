import Bargraph from "../component/Bargraph";
import Header from "../component/Header";
import Navbar from "../component/Navbar";

import brocolli from "../images/brocolli.png";
import StatisticsMenu from "../component/StatisticsMenu";

export default function StatisticsPage() {
  return `
    ${Header({ isPaymentVisible: false })}
    ${Navbar()}
    <section class="container">
        <div class="statistics">
        ${StatisticsMenu()}
        ${Bargraph()}
        </div>
    </section>
    <img id="brocolli" alt="브로콜리" src=${brocolli}/>
    `;
}
