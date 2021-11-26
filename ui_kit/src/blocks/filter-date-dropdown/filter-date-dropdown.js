import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';
import "../air-datepicker/air-datepicker.scss";
import { setings } from '../air-datepicker/air-datepicker.js';

setings.container = ".filter-date-dropdown";

new AirDatepicker( '#filter-date-dropdown', setings );