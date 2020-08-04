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

    const $app = document.querySelector("main#app");
    $app.innerHTML = renderingPage();
  }

  setTimeout(render, 0);

  return "";
}
