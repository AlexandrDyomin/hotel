import AirDatepicker from "air-datepicker";
import "air-datepicker/air-datepicker.css";
import "./booking-card.scss";
import "../air-datepicker/air-datepicker.scss";
import { 
  settings as defaultSettings, 
  makeHandlerOnHide 
} from "../date-dropdown/date-dropdown.js";
import { findParent } from "../../common-modules/scan";

// возвращает дату в формате ISO
// принимает в качестве аргумента строку в формате дд.мм.гггг
const getISODate = str => str.slice( 6, 10 ) + "." + str.slice( 3, 6 ) + str.slice( 0, 3 );

// форматирует строку с ценой 
const getFormattedPrice = str => ( str.length > 3) ?
  str.slice( 0, str.length - 3 ) + " " + str.slice( str.length - 3 )
  : str;

let settings = { ... defaultSettings };
settings.container = ".booking-card__date-dropdown";
settings.onHide = makeHandlerOnHide( settings.container );
let dp = new AirDatepicker( '#booking-card', settings );

let $container = document.querySelector( settings.container );
let $textFields = $container.querySelectorAll( ".text-field" );
let dateFrom = new Date( getISODate( $textFields[0].value ) );
let dateTo = new Date( getISODate( $textFields[1].value ) );

// выбираем даты из текстовых полей 
dp.selectDate( [ dateFrom, dateTo ] );

let numberDays = ( dateTo.getTime() - dateFrom.getTime() ) / ( 24 * 3600 * 1000);
let $bookingCard = findParent( $container, "booking-card" )
let $numberDays = $bookingCard.querySelector(".booking-card__number-of-days");
let lastWord = ( numberDays > 1 ) ? " суток" : " сутки";
$numberDays.innerText = numberDays + lastWord;

let pricePerDay = $bookingCard.querySelector(
  ".booking-card__price-per-day > .booking-card__price"
).innerText;

pricePerDay = +pricePerDay.replace(" ", "")

let result = (pricePerDay * numberDays);
let $result = $bookingCard.querySelector( ".bookung-card__right > .booking-card__price" );
$result.innerText = getFormattedPrice( result.toString() );


// считаем общую стоимость с учетом скидок и сборов
let discount = $bookingCard.querySelector( 
  ".booking-card__discount > .booking-card__price" 
).innerText;
discount = +discount.replace( " ", "" );

let serviceCharge = $bookingCard.querySelector(
  ".booking-card__serviceCharge > .booking-card__price"
).innerText;
serviceCharge = +serviceCharge.replace( " ", "" );


let additionalServiceCharge = $bookingCard.querySelector(
  ".booking-card__additionalServiceCharge > .booking-card__price"
).innerText;
additionalServiceCharge = +additionalServiceCharge.replace( " ", "" );

let total = result - discount + serviceCharge + additionalServiceCharge;

let $total = $bookingCard.querySelector( 
  ".booking-card__bottom .booking-card__price" 
);
$total.innerText = getFormattedPrice( total.toString() );