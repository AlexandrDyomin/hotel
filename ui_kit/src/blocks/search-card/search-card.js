import AirDatepicker from "air-datepicker";
import "air-datepicker/air-datepicker.css";
import "../air-datepicker/air-datepicker.scss";
import "./search-card.scss";
import { 
  settings as defaultSettings, 
  makeHandlerOnHide 
} from "../date-dropdown/date-dropdown.js";

let settings = { ... defaultSettings };
settings.container = ".search-card__date-dropdown";
settings.onHide = makeHandlerOnHide(settings.container);
new AirDatepicker( '#search-card', settings );