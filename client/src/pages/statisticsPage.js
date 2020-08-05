<<<<<<< HEAD
import Bargraph from "../component/Bargraph";
import StatisticsMenu from "../component/StatisticsMenu";

export default function StatisticsPage() {
  return `
    <div class="statistics" style="width:80%">
        ${StatisticsMenu()}
        ${Bargraph()}
    </div>
`;
}
=======
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
>>>>>>> f8a5560e6be2a7641e091f013c22d8345124dd26
