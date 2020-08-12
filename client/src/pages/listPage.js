import Form from "../component/Form";
import Filter from "../component/Filter";
import Ledger from "../component/Ledger";
import Header from "../component/Header";
import Modal from "../component/Modal";
import Navbar from "../component/Navbar";

import brocolli from "../images/brocolli.png";
import { fetchPaymentList, fetchLedgerItem } from "../store";
import { isLoggined } from "../util/util";

export default function ListPage() {
  function setTokenInLocalStorage() {
    if (!document.cookie) return;
    // parse token from cookie
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token"))
      .split("=")[1];
    localStorage.setItem("token", token);
    // remove token in cookie
    document.cookie = "token= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
    location.href = "/list";
  }

  setTokenInLocalStorage();

  fetchLedgerItem();
  fetchPaymentList();

  return `
    ${Header({ isPaymentVisible: true })}
    ${Navbar()}
    <section class="container">
        ${Form()}
        ${Filter()}
        ${Ledger()}
    </section>
    ${Modal()}
    <img id="brocolli" alt="브로콜리" src=${brocolli}/>
    `;
}
