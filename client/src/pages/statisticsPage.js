import Bargraph from "../component/Bargraph";
import Header from "../component/Header";
import Navbar from "../component/Navbar";
import LineGraph from "../component/LineGraph";
import StatisticsMenu from "../component/StatisticsMenu";

import brocolli from "../images/brocolli.png";
import PieChart from "../component/PieChart";

export default function StatisticsPage() {
  return `
    ${Header({ isPaymentVisible: false })}
    ${Navbar()}
    <section class="container">
        <div class="statistics">
        ${StatisticsMenu()}
        ${PieChart()}
        ${Bargraph()}
        ${LineGraph()}
        </div>
    </section>
    <img id="brocolli" alt="브로콜리" src=${brocolli}/>
    `;
}
