import "./pages/listPage";
import ListPage from "./pages/listPage";
import CalendarPage from "./pages/calendarPage";
import HomePage from "./pages/homePage";
import StatisticsPage from "./pages/statisticsPage";

class Router {
  constructor() {
    this.routes = {
<<<<<<< HEAD
      "": StatisticsPage, // TODO: make home page
=======
      "": HomePage,
>>>>>>> f8a5560e6be2a7641e091f013c22d8345124dd26
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
<<<<<<< HEAD
    history.pushState(
      { prevURL: location.pathname },
      null,
      this.root + this.removeSlashes(path)
    );

=======
    history.pushState({ prevURL: location.pathname }, null, this.root + this.removeSlashes(path));
    
>>>>>>> f8a5560e6be2a7641e091f013c22d8345124dd26
    const popStateEvent = new PopStateEvent("popstate");
    dispatchEvent(popStateEvent);
  }
}

const router = new Router();

export default router;
