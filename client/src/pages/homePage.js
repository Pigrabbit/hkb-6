import Header from "../component/Header";

import brocolli from "../images/brocolli.png";

export default function HomePage() {
  return `
    ${Header({ isPaymentVisible: false })}
    <section class="container">
        <div class="home">
            <a class="login-btn" href="/auth/login">Login</a>
            <a class="logout-btn" href="/auth/logout">Logout</a>
            <a class="google-oauth-btn" href="/auth/google">Google+</a>
        </div>
    </section>
    <img id="brocolli" alt="브로콜리" src=${brocolli}/>
    `;
}
