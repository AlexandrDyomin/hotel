import AirDatepicker from "air-datepicker";
import "air-datepicker/air-datepicker.css";
import "../air-datepicker/air-datepicker.scss";
import "./search-card.scss";
import { setings } from "../date-dropdown/date-dropdown.js";

setings.container = ".search-card__date-dropdown";
new AirDatepicker( '#search-card', setings );