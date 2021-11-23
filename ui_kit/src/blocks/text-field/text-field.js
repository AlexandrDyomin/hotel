import addHandler from "../../common-modules/addHandler"
import "./text-field.scss"

const getInputNumbersValue = input => input.value.replace(/\D/g, "");
const formatNumber = day => ( day >= 10 ) ? `${ day }.` : `0${ day }.`;
const formatMonth = month =>  ( month >= 10 ) ? `${ month }.` : `0${ month }.`;
const moveCursor = ( input, startPosition, step = 0 ) => {
  input.selectionStart = startPosition + step;
  input.selectionEnd = startPosition + step;
}

class DateOfBirth {
  year = null;
  month = null;
  day = null;
  maxNumberOfDaysInMonth = {
   1: 30, 2: 29, 3: 31, 4: 30,
   5: 31, 6: 30, 7: 31, 8: 31,
   9: 30, 10: 31, 11: 30, 12: 31 
  }

  isLeapYear(year) {
    return ( ( year % 4 == 0 ) && ( year % 100 != 0 ) ) || ( year % 400 == 0 );
  }

  setDay( day ) {
    if ( this.month ) {
      this.day = ( day <= this.maxNumberOfDaysInMonth[this.month] ) ? day : null;
    } else {
      this.day = ( day > 0 && day <= 31 ) ? day : null;
    }
  }

  setMonth ( month ) {
    if ( this.day ) {
      this.month = (  this.day <= this.maxNumberOfDaysInMonth[month] ) ? month : null;
    } else {
      this.month = ( month > 0 && month <= 12 ) ? month: null;
    }
  }

  setYear( year ) {
    if ( this.day >= 29 && this.month === 2 ) {
      this.year = ( this.isLeapYear(year) ) ? year : null;
    } else {
      this.year = ( year >= 1900 ) ? year : null;
    }
  }

}

let dateOfBirth = new DateOfBirth();

const handleTextFieldInput = e => {
  let input = e.currentTarget;
  let inputNumbersValue = getInputNumbersValue( input );

  // если ввели не число, очищаем поле
  if ( !inputNumbersValue ) {
    return input.value = "";
  }
  
  let formattedValue = ""
  if ( inputNumbersValue.length === 1 ) {
    formattedValue = ( e.data > 3) ?
    `0${ inputNumbersValue }.` : inputNumbersValue;      
  }

  if ( inputNumbersValue.length === 2 ) {
    dateOfBirth.setDay( +inputNumbersValue );
    let day = dateOfBirth.day;

    formattedValue = ( !day ) ? 
      inputNumbersValue[0] : formatNumber( day );

  }

  if ( inputNumbersValue.length === 3 ) {
    dateOfBirth.setDay( +inputNumbersValue.slice( 0, 2 ) );
    let day = dateOfBirth.day;

    let month = null;
    if ( e.data > 1 ) {
      dateOfBirth.setMonth( e.data );
      month = dateOfBirth.month; 
    }

    formattedValue = ( month ) ?
      `${ formatNumber( day ) }0${ month }.` 
      : `${ formatNumber( day ) }${ e.data }`;
  }

  if ( inputNumbersValue.length === 4 ) {
    dateOfBirth.setDay( +inputNumbersValue.slice( 0, 2 ) );
    dateOfBirth.setMonth( +inputNumbersValue.slice( 2, 4 ) );
    let day = dateOfBirth.day;
    let month = dateOfBirth.month; 

    formattedValue = ( month ) ? 
     `${ formatNumber( day ) }${ formatMonth( month ) }`
     : `${ formatNumber( day ) }${ inputNumbersValue[2] }`;
  }

  


  // console.log("Число: " + dateOfBirth.day)
  // console.log("Месяц: "+ dateOfBirth.month)

  
  input.value = formattedValue;
}


// const handleTextFieldInput = e => {
//   let input = e.currentTarget;
//   let inputNumbersValue = getInputNumbersValue(input);

//   if ( !inputNumbersValue ) {
//     return input.value = "";
//   }

//   let selectionStart = input.selectionStart;
//   if (input.value.length != selectionStart ) {
//     if ( e.data && /\D/g.test( e.data ) ) {
//       input.value = input.value.slice( 0, selectionStart - 1 ) + input.value.slice( selectionStart );
//       moveCursor( input, selectionStart, -1 );
//      }

//      if ( e.data ) {
//       //  debugger
//         switch ( selectionStart ) {
//           case 1:
//             if ( e.data >= "3" && inputNumbersValue[1] > "1" || e.data > "3" || e.data === "0" && inputNumbersValue[1] === "0" ) {
//               input.value = inputNumbersValue.slice( 1, 2 ) + "." + inputNumbersValue.slice( 2, 4 ) + "." + inputNumbersValue.slice( 4 );
//               moveCursor( input, selectionStart, -1 );
//               return;
//             }
//             // debugger
              
//             input.value = inputNumbersValue.slice( 0, 2 ) + "." + inputNumbersValue.slice( 2, 4 ) + "." + inputNumbersValue.slice( 4 ); 
//             moveCursor( input, selectionStart );
//             return;
    
//           case 2:
//             if ( e.data >= "2" && inputNumbersValue[0] === "3" || e.data === "0" && inputNumbersValue[0] === "0" ) {
//               input.value = inputNumbersValue.slice( 0, 1 ) + "." + inputNumbersValue.slice( 2, 4 ) + "." + inputNumbersValue.slice( 4 );
//               moveCursor( input, selectionStart, -1 );
//               return
//             }
            
//             input.value = inputNumbersValue.slice( 0, 2 ) + "." + inputNumbersValue.slice( 2, 4 ) + "." + inputNumbersValue.slice( 4 );
//             moveCursor( input, selectionStart );
//             return;
    
//           case 4:
//             if ( e.data > "1" || e.data === "0" && inputNumbersValue[3] === "0" || e.data === "1" && inputNumbersValue[3] > 2 ) {
//               input.value = inputNumbersValue.slice( 0, 2 ) + "." + inputNumbersValue.slice( 3, 4 ) + "." + inputNumbersValue.slice( 4 );        
//               moveCursor( input, selectionStart, -1 );
//               return;
//             }
    
//             input.value = inputNumbersValue.slice( 0, 2 ) + "." + inputNumbersValue.slice( 2, 4 ) + "." + inputNumbersValue.slice( 4 );
//             moveCursor( input, selectionStart );
//             return;
    
//           case 5:
//             if ( e.data > 2 && inputNumbersValue[2] >= "1" || e.data === "0" && inputNumbersValue[2] === "0" ) {
//               input.value = inputNumbersValue.slice( 0, 2 ) + "." + inputNumbersValue.slice( 2, 3 ) + "." + inputNumbersValue.slice( 4 );        
//               moveCursor( input, selectionStart, -1 );
//               return;
//             }

//             input.value = inputNumbersValue.slice( 0, 2 ) + "." + inputNumbersValue.slice( 2, 4 ) + "." + inputNumbersValue.slice( 4 );
//             moveCursor( input, selectionStart );
//             return; 
            
//           default:
//             input.value = inputNumbersValue.slice( 0, 2 ) + "." + inputNumbersValue.slice( 2, 4 ) + "." + inputNumbersValue.slice( 4 );
//             moveCursor( input, selectionStart, 1 );
//             return
//         }
//       }
//     return
//   }

//   let formattedValue= "";
//   if (inputNumbersValue.length === 1) { 
//     if ( inputNumbersValue > "3" ) {
//       formattedValue = "";
//     } else {
//       formattedValue = inputNumbersValue;
//     }
//   }

//   if ( inputNumbersValue.length === 2  ) {
//     if ( inputNumbersValue[0] === "3" && e.data > "1" || inputNumbersValue[1] === "0" && inputNumbersValue[0] === "0" ) {
//       formattedValue = inputNumbersValue.slice( 0, 1)
//     } else {
//       formattedValue = inputNumbersValue.slice( 0, 2 ) + ".";
//     }
//   }

//   if ( inputNumbersValue.length === 3  ) {
//     if ( inputNumbersValue.slice( -1 ) < 2 ) {
//       formattedValue = inputNumbersValue.slice( 0, 2 ) + "." + inputNumbersValue[2];
//     } else {
//       formattedValue = inputNumbersValue.slice( 0, 2 ) + ".";
//     }
//   }

//   if ( inputNumbersValue.length === 4  ) {
//     if ( inputNumbersValue[2] === "1" && inputNumbersValue[3] <= "2" || inputNumbersValue[2] === "0" && inputNumbersValue[3] > 0) {
//       formattedValue = inputNumbersValue.slice( 0, 2 ) + "." + inputNumbersValue[2] + inputNumbersValue[3] + ".";
//     } else {
//       formattedValue = inputNumbersValue.slice( 0, 2 ) + "." + inputNumbersValue[2];
//     }
//   }

//   if ( inputNumbersValue.length >= 5 ) {
//     formattedValue = inputNumbersValue.slice( 0, 2 ) + "." + inputNumbersValue.slice( 2, 4 ) + "." + inputNumbersValue.slice( 4 );
//   }

  
  
//   if ( inputNumbersValue.length === 8 ) {
    
//     let year = +inputNumbersValue.slice( 4 );
//     let month = +inputNumbersValue.slice( 2, 4 ) - 1;
//     let day = + inputNumbersValue.slice( 0, 2 );
//     let date = new Date( year, month, day );

//     if ( !( year === date.getFullYear() && month === date.getMonth() && day === date.getDate() ) ) {
      
//     }

//   }

//   input.value = formattedValue;
// }

// установим максимально допустимое кол-во символов
const textFields = document.querySelectorAll( ".text-field[data-mask=date]" );
textFields.forEach( item => item.setAttribute( "maxlength", "10" ) );

addHandler(
  textFields,
  handleTextFieldInput,
  "input"
);

const handleTextFieldKeyDown = e => { 
  let input = e.currentTarget;
  let lastChar = input.value.slice( -1 );

  if ( e.keyCode === 8 && lastChar === "." ){
    input.value = input.value.slice( 0, -2 );
    e.preventDefault()
  } 
}

addHandler(
  textFields,
  handleTextFieldKeyDown,
  "keydown"
);