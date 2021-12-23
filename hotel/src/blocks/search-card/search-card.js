import AirDatepicker from "air-datepicker";
import "air-datepicker/air-datepicker.css";
import "./search-card.scss";
import { 
  settings as defaultSettings, 
  makeHandlerOnHide 
} from "../date-dropdown/date-dropdown.js";
import "../air-datepicker/air-datepicker.scss";
import "../date-dropdown/date-dropdown.js";
import "../dropdown/dropdown.js";
import "../button/button.js";
import "../label/label.scss";

let settings = { ... defaultSettings };
settings.container = ".search-card__date-dropdown";
settings.onHide = makeHandlerOnHide(settings.container);
new AirDatepicker( '#search-card', settings );


let $card = document.querySelector(".search-card");
$card.addEventListener("submit", handleCardSubmit);

function handleCardSubmit(e) {
  e.preventDefault();
  let $card = e.currentTarget;
  let textFields = $card.querySelectorAll(".text-field");
  console.log(textFields)
  let isValid = false;

  for (let i = 0; i < textFields.length; i++) {
    if (textFields[i].value === "") {
      isValid = false;
      return;
    }

    isValid = true;
  }

  if (isValid) {
    let $link = $card.querySelector(".button")
    $link.click();  
  };
}