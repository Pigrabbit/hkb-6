import Bargraph from "../component/Bargraph";
import Header from "../component/Header";
import Navbar from "../component/Navbar";
import LineGraph from "../component/LineGraph";
import StatisticsMenu from "../component/StatisticsMenu";
import StackedBar from "../component/StackedBar";

import brocolli from "../images/brocolli.png";
import PieChart from "../component/PieChart";

import {
  fetchStatisticsData,
  fetchLedgerItem,
  fetchPreviousStatisticsData,
} from "../store";

export default function StatisticsPage() {
  fetchStatisticsData();
  fetchLedgerItem();
  fetchPreviousStatisticsData();

  return `
    ${Header({ isPaymentVisible: false })}
    ${Navbar()}
    <section class="container">
        <div class="statistics">
        ${StatisticsMenu()}
        ${PieChart()}
        ${Bargraph()}
        ${LineGraph()}
        ${StackedBar()}
        </div>
    </section>
    <img id="brocolli" alt="브로콜리" src=${brocolli}/>
    `;
}
