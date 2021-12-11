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