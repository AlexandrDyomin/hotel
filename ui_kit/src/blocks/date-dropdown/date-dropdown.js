import AirDatepicker from "air-datepicker";
import "air-datepicker/air-datepicker.css";
import "./date-dropdown.scss";
import "../filter-date-dropdown/filter-date-dropdown.scss";
import addHandler from '../../common-modules/addHandler';
import { findChildren, findElement, findParent } from '../../common-modules/scan';
import { changeAppearance, clearTextFields } from '../counter/counter';
import { 
  setings, 
  toggleButtonStateApply 
} from '../filter-date-dropdown/filter-date-dropdown';

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

// Модифицируем обработчик для кнопки "Применить"
const onSelect = ( { datepicker, formattedDate } ) => {
  toggleButtonStateApply( datepicker );
  writeDate( datepicker, formattedDate );
}

//  Добавляем обработчик для кнопки "Очистить"
setings.buttons[0] = {
  content: "Очистить",
  onClick( dp ) {
    let dateDropdown = findParent( dp.$datepicker, "date-dropdown" );
    let textFields = findChildren(dateDropdown, "text-field");
    clearTextFields(textFields);
  }
}

setings.container = ".date-dropdown"
setings.onSelect = onSelect

setings.onShow = (isFinished) => {
  if ( !isFinished ) {
    let textField = document.activeElement.nextElementSibling;
    changeAppearance( textField, "text-field_active" );
  }
}

setings.onHide = (isFinished) => {
  if ( !isFinished ) {
    let textField = findElement(
      datePicker.$datepicker, 
      "date-dropdown", 
      "text-field"
    ).nextElementSibling;
    changeAppearance( textField, "text-field_active" ); 
  }
}

let datePicker = new AirDatepicker('#date-dropdown', setings);

// показывает календарь
const handleDateDropdownFocus = ( e ) => {
  let inputLeft = e.currentTarget.previousElementSibling;
  inputLeft.focus();
}

// ДОБАВЛЯЕМ ОБРАБОТЧИК 
addHandler(
  document.querySelectorAll( 
    ".date-dropdown > .text-field[name=date-to]" 
  ),
  handleDateDropdownFocus,
  "focus"
);

export { setings }