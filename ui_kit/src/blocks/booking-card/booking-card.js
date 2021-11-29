import AirDatepicker from "air-datepicker";
import "air-datepicker/air-datepicker.css";
import "./booking-card.scss";
import "../air-datepicker/air-datepicker.scss";
import { 
  settings as defaultSettings, 
  makeHandlerOnHide 
} from "../date-dropdown/date-dropdown.js";

let settings = { ... defaultSettings };
settings.container = ".booking-card__date-dropdown";
settings.onHide = makeHandlerOnHide(settings.container);
new AirDatepicker( '#booking-card', settings );