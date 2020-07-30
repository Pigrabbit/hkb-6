import "./Navbar.scss";
import { bindEventAll } from "../util/util";
import Router from "../router";

export default function Navbar() {
  const componentName = "navbar";

  function onTabClick(e) {
    console.log(e.target.getAttribute("route"));
    Router.navigateTo(e.target.getAttribute("route"));
  }

  function render() {
    const html = `
        <div class="navbar-month">
            <i class="fa fa-caret-left fa-3x" aria-hidden="true"></i>
            <p>6월</p>
            <i class="fa fa-caret-right fa-3x" aria-hidden="true"></i>
        </div>
        <ul class="navbar-tab">
            <li class="navbar-tab-item" route="/list">내역</li>
            <li class="navbar-tab-item" route="/calendar">달력</li>
            <li class="navbar-tab-item" route="/statistics">통계</li>
        </ul>
        `;

    const $navbar = document.querySelector(`.${componentName}`);
    $navbar.innerHTML = html;

    bindEventAll("li.navbar-tab-item", "click", onTabClick);
  }

  // subscribe(componentName, "", );
  setTimeout(render, 0);

  return `<nav class=${componentName}></nav>`;
}
