import Header from "./component/Header";
import Navbar from "./component/Navbar";
import Form from "./component/Form";
import Filter from "./component/Filter";
import Ledger from "./component/Ledger";
import Modal from "./component/Modal";

import brocolli from "./images/brocolli.png";

import "./scss/main.scss";
import { fetchPaymentList } from "./store";

export function App() {
  fetchPaymentList();
  return `
    ${Header()}
    ${Modal()}
    ${Navbar()}
    <section>
        ${Form()}
        ${Filter()}
        ${Ledger()}
    </section>
 
    <img id="brocolli" alt="브로콜리" src=${brocolli}/>
    `;
}

export default App;
