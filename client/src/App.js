import Router from "./router";
import Header from "./component/Header";
import Navbar from "./component/Navbar";
import Modal from "./component/Modal";

import brocolli from "./images/brocolli.png";
import "./scss/main.scss";
import { fetchLedgerItem, fetchPaymentList } from "./store";

export default function App() {
  window.addEventListener("popstate", (e) => {
    render();
  });

  function render() {
    const renderingPage = Router.getCurrentURLView(location.pathname);

    const $container = document.querySelector("section.container");
    $container.innerHTML = renderingPage();
  }

  fetchLedgerItem();
  fetchPaymentList();
  setTimeout(render, 0);

  return `
    ${Header()}
    ${Navbar()}
    <section class="container"></section>
    ${Modal()}
    <img id="brocolli" alt="브로콜리" src=${brocolli}/>
    `;
}
