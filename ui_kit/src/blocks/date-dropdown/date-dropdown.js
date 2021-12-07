import AirDatepicker from "air-datepicker";
import "air-datepicker/air-datepicker.css";
import "./date-dropdown.scss";
import "../air-datepicker/air-datepicker.scss";
import addHandler from '../../common-modules/addHandler';
import { findChildren, findElement, findParent, findChild } from '../../common-modules/scan';
import { changeAppearance, clearTextFields } from '../counter/counter';
import { defaultSettings, toggleButtonStateApply } from '../air-datepicker/air-datepicker.js';
import "../text-field/text-field.js";

// заполняет текстовые поля выбранными датами
const writeDate = ( datepicker, formattedDate ) => {  
  let dateDropdown = findParent( datepicker.$datepicker, "date-dropdown" );
  let textFields = findChildren(dateDropdown, "text-field");

  switch ( formattedDate.length ) {
    case 1: 
      textFields[0].value = formattedDate[0];
      textFields[1].value = ""
      return;
    case 2:
      textFields[0].value = formattedDate[0];
      textFields[1].value = formattedDate[1];
      return
  }
} 

// Обработчик для кнопки "Применить"
const onSelect = ( { datepicker, formattedDate } ) => {
  toggleButtonStateApply( datepicker );
  writeDate( datepicker, formattedDate );
}

let settings = { ...defaultSettings };

//  Добавляем обработчик для кнопки "Очистить"
settings.buttons[0] = {
  content: "Очистить",
  onClick( dp ) {
    let dateDropdown = findParent( dp.$datepicker, "date-dropdown" );
    let textFields = findChildren(dateDropdown, "text-field");
    clearTextFields(textFields);
    dp.clear();
  }
}

settings.container = ".date-dropdown"
settings.onSelect = onSelect

settings.onShow = (isFinished) => {
  if ( !isFinished ) {
    let textField = document.activeElement.nextElementSibling;
    changeAppearance( textField, "text-field_active" );
  }
}

const makeHandlerOnHide = ( container ) => {
  return ( isFinished ) => {
    if ( !isFinished ) {
      let parent = document.querySelector( container );
      let textField = findChild(
        parent, 
        "text-field"
      ).nextElementSibling;
      changeAppearance( textField, "text-field_active" ); 
    }
  }  
}

settings.onHide = makeHandlerOnHide(settings.container);

settings.dateFormat = "dd.MM.yyyy";

new AirDatepicker( '#date-dropdown', settings );

// показывает календарь
const handleDateDropdownFocus = ( e ) => {
  let inputLeft = e.currentTarget.previousElementSibling;
  inputLeft.focus();
}

// ДОБАВЛЯЕМ ОБРАБОТЧИК 
addHandler(
  document.querySelectorAll( 
    ".date-dropdown__wrap > .text-field[name=date-to]" 
  ),
  handleDateDropdownFocus,
  "focus"
);

export { settings, makeHandlerOnHide }