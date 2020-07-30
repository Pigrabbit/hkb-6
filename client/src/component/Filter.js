import "./Filter.scss";

export default function Filter() {
  const componentName = "filter";

  function render() {
    const html = ` 
    <li class="filter-item">
        <input
          type="checkbox"
          id="filter-item-income"
          name="filter-item-income"
          value="filter-item-income"
        />
        <label for="filter-item-income"></label>
        <div class="filter-item-income-label">수입</div>
        <div class="filter-item-income-amount filter-item-amount">2,750,000원</div>
      </li>
      <li class="filter-item">
        <input
          type="checkbox"
          id="filter-item-outcome"
          name="filter-item-outcome"
          value="filter-item-outcome"
        />
        <label for="filter-item-outcome"></label>
        <div class="filter-item-outcome-label">지출</div>
        <div class="filter-item-outcome-amount filter-item-amount">444,000원</div>
      </li>`;

    const $filter = document.querySelector(`.${componentName}`);
    $filter.innerHTML = html;

    // bindEvent("", "", )
  }

  // subscribe(componentName, "", );
  setTimeout(render, 0);

  return `<ul class=${componentName}></ul>`;
}
