import Bargraph from "../component/Bargraph";

export default function StatisticsPage() {
  return `
    <div class="statistics" style="width:100%">
        <header class="statistics-header">
        <div>
        <input type="radio" id="male" name="gender" value="male">
        <label for="male">카테고리별 지출</label>
        <input type="radio" id="female" name="gender" value="female">
        <label for="female">일별 지출</label>
        </div>
        <div>
          <p>이번 달 지출 금액</p>
          <p class="current-month-total-price">444,790원</p>
        </div>
        </header>
        ${Bargraph()}
    </div>
`;
}
