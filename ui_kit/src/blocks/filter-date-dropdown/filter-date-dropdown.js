import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';
import { findChildren } from '../../common-modules/scan';
import { toggleState } from '../counter/counter';
import "./filter-date-dropdown.scss";

new AirDatepicker('#filter-date-dropdown', {
  range: true,
  dynamicRange: true,
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
    let $dp = datepicker.$datepicker;
    let buttonApply = findChildren( $dp, "air-datepicker-button" )[1];
    let isDesabled = buttonApply.disabled;

    if ( datepicker.selectedDates.length === 2 ) {   
      toggleState( buttonApply );
    } else if ( !isDesabled ) {
      toggleState( buttonApply );
    }
  }
});


let nav = document.querySelectorAll(".air-datepicker-nav--action");
nav.forEach( el => el.innerHTML="" )

