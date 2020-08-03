import "./Navbar.scss";
import { bindEventAll, bindEvent } from "../util/util";
import Router from "../router";
import { getCurrentDate, subscribe, toPrevMonth, toNextMonth } from "../store";

export default function Navbar() {
  const componentName = "navbar";

  function onTabClick(e) {
    const path = e.target.getAttribute("route");
    Router.navigateTo(path);
  }

  function onToPrevMonthBtnClick(e) {
    toPrevMonth();
  }

  function onToNextMonthBtnClick(e) {
    toNextMonth();
  }

  function render() {
    const { year, month } = getCurrentDate();

    const html = `
        <div class="navbar-month">
            <i class="fa fa-caret-left fa-3x" aria-hidden="true"></i>
            <p>${year}년 ${month}월</p>
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
    bindEvent("i.fa-caret-left", "click", onToPrevMonthBtnClick);
    bindEvent("i.fa-caret-right", "click", onToNextMonthBtnClick);
  }

  subscribe(componentName, "currentDate", render);
  setTimeout(render, 0);

  return `<nav class=${componentName}></nav>`;
}
