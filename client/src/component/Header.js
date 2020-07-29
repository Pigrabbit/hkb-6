import "./Header.scss";

export default function Header() {
  const componentName = "header";

  function render() {
    const html = `
      <i
        class="fa fa-cutlery"
        aria-hidden="true"
        style="margin-right: 10px;"
      ></i>
      <div class="header-title">배민 샐러드</div>
      <button class="header-payment-btn">결제수단관리</button>
      `;

    const $header = document.querySelector(`.${componentName}`);
    $header.innerHTML = html;

    // bindEvent("", "");
  }

  //   subscribe(componentName, "", render);
  setTimeout(render, 0);

  return `<header class=${componentName}></header>`;
}
