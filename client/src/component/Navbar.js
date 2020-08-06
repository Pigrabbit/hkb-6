import "./Navbar.scss";
import { bindEventAll, bindEvent, $all } from "../util/util";
import Router from "../router";
import {
  getCurrentDate,
  subscribe,
  toPrevMonth,
  toNextMonth,
  getCurrentTab,
  changeCurrentTab,
} from "../store";

export default function Navbar() {
  const componentName = "navbar";

  function onTabClick(e) {
    const li = e.target.closest("li");
    if (li.id !== getCurrentTab()) {
      changeCurrentTab(li.id);
    }

    const path = li.getAttribute("route");
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
    const currentTab = getCurrentTab();
    const html = `
        <div class="navbar-month">
            <i class="fa fa-caret-left fa-3x" aria-hidden="true"></i>
            <p>${year}년 ${month}월</p>
            <i class="fa fa-caret-right fa-3x" aria-hidden="true"></i>
        </div>
        <ul class="navbar-tab">
            <li id="tab-list" class="navbar-tab-item ${
              currentTab === "tab-list" ? "active-tab-style" : ""
            }" route="/list"><span>내역</span></li>
            <li id="tab-calendar" class="navbar-tab-item ${
              currentTab === "tab-calendar" ? "active-tab-style" : ""
            }" route="/calendar"><span>달력</span></li>
            <li id="tab-statistics" class="navbar-tab-item ${
              currentTab === "tab-statistics" ? "active-tab-style" : ""
            }" route="/statistics"><span>통계</span></li>
        </ul>
        `;

    const $navbar = document.querySelector(`.${componentName}`);
    $navbar.innerHTML = html;

    bindEventAll("li.navbar-tab-item", "click", onTabClick);
    bindEventAll("span", "click", onTabClick);
    bindEvent("i.fa-caret-left", "click", onToPrevMonthBtnClick);
    bindEvent("i.fa-caret-right", "click", onToNextMonthBtnClick);
  }

  subscribe(componentName, "currentDate", render);
  subscribe(componentName, "currentTab", render);
  setTimeout(render, 0);

  return `<nav class=${componentName}></nav>`;
}
