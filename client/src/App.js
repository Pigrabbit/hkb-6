import Router from "./router";

import "./scss/main.scss";

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
