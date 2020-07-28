import App from "./App";
import "./main.scss";
import brocolli from "./images/brocolli.png";

document.getElementById("brocolli").src = brocolli;

const $app = document.querySelector("#ap");
$app.innerHTML = App();