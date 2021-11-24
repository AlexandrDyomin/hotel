import addHandler from "../../common-modules/addHandler"
import "./text-field.scss";
import { DateOfBirth } from "../../common-modules/DateOfBirth";

const getInputNumbersValue = input => input.value.replace(/\D/g, "");
const formatNumber = day => ( day >= 10 ) ? `${ day }.` : `0${ day }.`;
const formatMonth = month =>  ( month >= 10 ) ? `${ month }.` : `0${ month }.`;
const moveCursor = ( input, startPosition, step = 0 ) => {
  input.selectionStart = startPosition + step;
  input.selectionEnd = startPosition + step;
}

let dateOfBirth = new DateOfBirth();
window.dateOfBirth = dateOfBirth;

const handleTextFieldInput = e => {
  let input = e.currentTarget;
  let inputNumbersValue = getInputNumbersValue( input );

  // если ввели не число, очищаем поле
  if ( !inputNumbersValue ) {
    return input.value = "";
  }

  // выходим если удалили символ из поля
  if ( !e.data ) return;

  let numberOfDigits = inputNumbersValue.length;
  // если в поле меньше одной цифры сбрасываем установленную дату в dateOfBirth;
  if ( numberOfDigits <= 1 ) dateOfBirth.reset();

  let selectionStart = input.selectionStart;
  // обработка ситуации, когда курсор находится не вконце строки
  if (input.value.length != selectionStart ) {
    // если введенный символ не число, удаляем его
    if ( e.data && /\D/g.test( e.data ) ) {
      input.value = input.value.slice( 0, selectionStart - 1 ) + input.value.slice( selectionStart );
      moveCursor( input, selectionStart, -1 );
      return;
     }
    
    return
  }

  let formattedValue = "";
  if ( numberOfDigits === 1 ) {
    formattedValue = ( e.data > 3) ?
    `0${ inputNumbersValue }.` : inputNumbersValue;      
  }

  let day = null;
  if ( numberOfDigits >= 2 ) {
    dateOfBirth.setDay( +inputNumbersValue.slice( 0, 2 ) );
    day = dateOfBirth.day;
  }

  if ( numberOfDigits === 2 ) {
    formattedValue = ( !day ) ? 
      inputNumbersValue[0] : formatNumber( day );
  }

  if ( numberOfDigits === 3 ) {
    let month = null;

    if ( e.data > 1 ) {
      dateOfBirth.setMonth( e.data );
      month = dateOfBirth.month; 
    }

    formattedValue = ( month ) ?
      `${ formatNumber( day ) }0${ month }.` 
      : `${ formatNumber( day ) }${ e.data }`;
  }

  let month = null; 
  if ( numberOfDigits >= 4 ) {
    dateOfBirth.setMonth( +inputNumbersValue.slice( 2, 4 ) );
    month = dateOfBirth.month;
  }

  if ( numberOfDigits === 4 ) {
    formattedValue = ( month ) ? 
     `${ formatNumber( day ) }${ formatMonth( month ) }`
     : `${ formatNumber( day ) }${ inputNumbersValue[2] }`;
  }

  if ( numberOfDigits === 5 ) {
    formattedValue = ( e.data >= 1 ) ?
      `${ formatNumber( day ) }${ formatMonth( month ) }${ e.data }`
      : `${ formatNumber( day ) }${ formatMonth( month ) }`;
  }

  if ( numberOfDigits === 6 ) {
    let centry = inputNumbersValue.slice( 4, 6 );
    formattedValue = ( centry >= 19 ) ?
      `${ formatNumber( day ) }${ formatMonth( month ) }${ centry }`
      : `${ formatNumber( day ) }${ formatMonth( month ) }${ inputNumbersValue[4] }`;
  } 

  if ( numberOfDigits === 7 ) {
    let first3DigitOfYear = inputNumbersValue.slice( 4, 7 );
    formattedValue = `${ formatNumber( day ) }${ formatMonth( month ) }${ first3DigitOfYear }`;
  }

  if ( numberOfDigits === 8 ) {
    let year = +inputNumbersValue.slice( 4, 8 );
    dateOfBirth.setYear( year );
    year = dateOfBirth.year;
    let first3DigitOfYear = inputNumbersValue.slice( 4, 7 );

    formattedValue = ( year ) ?
      `${ formatNumber( day ) }${ formatMonth( month ) }${ year }`
      : `${ formatNumber( day ) }${ formatMonth( month ) }${ first3DigitOfYear }`
  }

  input.value = formattedValue;
}

// установим максимально допустимое кол-во символов
const textFields = document.querySelectorAll( ".text-field[data-mask=date]" );
textFields.forEach( item => item.setAttribute( "maxlength", "10" ) );

addHandler(
  textFields,
  handleTextFieldInput,
  "input"
);