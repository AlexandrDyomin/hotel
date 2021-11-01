import "../public/style.scss";
import "./blocks/dropdown/dropdown.js";
import "./blocks/counter/counter.js";
import "./blocks/likes/likes.js"

const loadPage = () => {
  document.body.style.display = "block"
}

window.addEventListener("load", loadPage);
