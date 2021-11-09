import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';
import "./filter-date-dropdown.scss";
import { toggleState } from '../counter/counter';
import { findChildren } from '../../common-modules/scan';

// управляет состоянием кнопки "Применить"
const toggleButtonStateApply = ( datepicker ) => {
  let $dp = datepicker.$datepicker;
  let buttonApply = findChildren( $dp, "air-datepicker-button" )[1];
  let isDesabled = buttonApply.disabled;

  if ( datepicker.selectedDates.length === 2 ) {   
    toggleState( buttonApply );
  } else if ( !isDesabled ) {
    toggleState( buttonApply );
  }
}

// настройки для календаря
let setings = {
  container: ".filter-date-dropdown",
  view: 'days',
  range: true,
  dynamicRange: true,
  multipleDates: 2,
  multipleDatesSeparator: ' - ',
  minDate: new Date(),
  navTitles: {
    days: '<strong>MMMM yyyy</strong>', 
  },
  buttons: [
    'clear',
    {
      content(dp) {
        let $dp = dp.$datepicker;
        setTimeout(() => {
          let buttonApply = findChildren( $dp, "air-datepicker-button" )[1];
          toggleState( buttonApply );   
        });

        return "Применить";
      },
      onClick(dp) {
        if (dp.selectedDates.length === 2) {
          dp.hide();
        }
      }
    }
  ],
  dateFormat: "dd MMM",
  onSelect( { datepicker } ) {
    toggleButtonStateApply( datepicker );
  }
};


// удаляет дефолтные стрелки для навигации
const removeArrows = (dp) => {
  let nav = dp.$datepicker.querySelectorAll( ".air-datepicker-nav--action" );
  nav.forEach( el => el.innerHTML = "" )
}

// удаляет выноску календаря
const removePointer = ( dp ) => {
  let pointer = dp.$datepicker.querySelector( ".air-datepicker--pointer" );
  pointer.remove();
}

let datePicker =new AirDatepicker('#filter-date-dropdown', setings);

// удаляем дефолтные стрелки для навигации
removeArrows(datePicker);

// удаляем выноску календаря
removePointer( datePicker );



export { setings, toggleButtonStateApply, removeArrows, removePointer };