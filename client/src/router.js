import "./pages/listPage";
import ListPage from "./pages/listPage";
import CalendarPage from "./pages/calendarPage";
import HomePage from "./pages/homePage";
import StatisticsPage from "./pages/statisticsPage";

class Router {
  constructor() {
    this.routes = {
      "": HomePage,
      list: ListPage,
      calendar: CalendarPage,
      statistics: StatisticsPage, // TODO: make statistics page
    };
    this.root = "/";
  }

  getCurrentURLView(path) {
    const key = this.removeSlashes(path);
    return this.routes[key];
  }

  removeSlashes(path) {
    return path.toString().replace(/\/$/, "").replace(/^\//, "");
  }

  navigateTo(path) {
    history.pushState({ prevURL: location.pathname }, null, this.root + this.removeSlashes(path));
    
    const popStateEvent = new PopStateEvent("popstate");
    dispatchEvent(popStateEvent);
  }
}

const router = new Router();

export default router;
