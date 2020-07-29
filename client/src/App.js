import Header from "./component/Header";
import Navbar from "./component/Navbar";
import Form from "./component/Form";
import Filter from "./component/Filter";
import Ledger from "./component/Ledger";

import brocolli from "./images/brocolli.png";

import "./main.scss"

export function App() {
    return `
    ${Header()}
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
