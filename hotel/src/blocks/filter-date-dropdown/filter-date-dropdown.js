import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';
import "../air-datepicker/air-datepicker.scss";
import { defaultSettings } from '../air-datepicker/air-datepicker.js';
import "../text-field/text-field.js";


let settings = { ...defaultSettings };
settings.container = ".filter-date-dropdown";


settings.onShow = () => {
	let $dp = document.querySelector(".air-datepicker");
	$dp.classList.add("small");
	
}

new AirDatepicker( '#filter-date-dropdown', settings );
