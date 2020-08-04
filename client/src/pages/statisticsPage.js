import Bargraph from "../component/Bargraph";

export default function StatisticsPage() {
  return `
    <div class="statistics" style="width:100%">
        This is statistics page
        ${Bargraph()}
    </div>
`;
}
