import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';
import addHandler from '../../common-modules/addHandler';
import { findChildren, findParent } from '../../common-modules/scan';
import { clearTextFields } from '../counter/counter';
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

let datePicker = new AirDatepicker('#date-dropdown', setings);

// показывает календарь
const handleDateDropdownFocus = () => {
  let inputLeft = document.querySelector( 
    ".date-dropdown > .text-field[name=date-from]" 
  );
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