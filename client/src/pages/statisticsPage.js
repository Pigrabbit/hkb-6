import Bargraph from "../component/Bargraph";
import StatisticsMenu from "../component/StatisticsMenu";

export default function StatisticsPage() {
  return `
    <div class="statistics" style="width:80%">
        ${StatisticsMenu()}
        ${Bargraph()}
    </div>
`;
}
