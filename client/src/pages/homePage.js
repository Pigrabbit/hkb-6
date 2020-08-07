import Header from "../component/Header";
import "./homePage.scss";
import brocolli from "../images/brocolli.png";
import googleBtn from "../images/google-signin-btn.svg";
import { bindEvent, $ } from "../util/util";

export default function HomePage() {
  function onGoogleOauthBtnClick() {
    location.href = "/auth/google";
  }

  function render() {
    const html = `
        <div class="loader">
            <span>L</span>
            <span>O</span>
            <span>G</span>
            <span>I</span>
            <span>N</span>
        </div>
       
        <button class="google-oauth-btn">
        <img class="google-oauth-btn-image" src=${googleBtn}>
        <div class="google-oauth-btn-text">Sign in with Google</div>
    </button>
        
        `;

    const $contianer = $(".container");
    $contianer.innerHTML = html;

    bindEvent("button.google-oauth-btn", "click", onGoogleOauthBtnClick);
  }

  setTimeout(render, 0);

  return `
    ${Header({ isPaymentVisible: false })}
    <section class="container"></section>
    <img id="brocolli" alt="브로콜리" src=${brocolli}/>
    `;
}
