import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';
import "../air-datepicker/air-datepicker.scss";
import { defaultSettings } from '../air-datepicker/air-datepicker.js';

let settings = { ...defaultSettings };
settings.container = ".filter-date-dropdown";

new AirDatepicker( '#filter-date-dropdown', settings );