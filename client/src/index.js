import App from "./App";
import brocolli from "./images/brocolli.png";

document.getElementById("brocolli").src = brocolli;

const $app = document.querySelector("#app");
$app.innerHTML = App();
