import "./Navbar.scss";

export default function Navbar() {
  const componentName = "navbar";

  function render() {
    const html = `
        <div class="navbar-month">
            <i class="fa fa-caret-left fa-3x" aria-hidden="true"></i>
            <p>6월</p>
            <i class="fa fa-caret-right fa-3x" aria-hidden="true"></i>
        </div>
        <ul class="navbar-tab">
            <li class="navbar-tab-item">내역</li>
            <li class="navbar-tab-item">달력</li>
            <li class="navbar-tab-item">통계</li>
        </ul>
        `;

    const $navbar = document.querySelector(`.${componentName}`);
    $navbar.innerHTML = html;

    // bindEvent("", "", )
  }

  // subscribe(componentName, "", );
  setTimeout(render, 0);

  return `<nav class=${componentName}></nav>`;
}
