import addHandler from "../../common-modules/addHandler"
import "./text-field.scss"

const getInputNumbersValue = input => input.value.replace(/\D/g, "");
const moveCursor = ( input, startPosition, step = 0 ) => {
  input.selectionStart = startPosition + step;
  input.selectionEnd = startPosition + step;
}

const handleTextFieldInput = e => {
  let input = e.currentTarget;
  let inputNumbersValue = getInputNumbersValue(input);

  if ( !inputNumbersValue ) {
    return input.value = "";
  }

  let selectionStart = input.selectionStart;
  if (input.value.length != selectionStart ) {
    if ( e.data && /\D/g.test( e.data ) ) {
      input.value = input.value.slice( 0, selectionStart - 1 ) + input.value.slice( selectionStart );
      moveCursor( input, selectionStart, -1 );
     }

     if ( e.data ) {
      //  debugger
        switch ( selectionStart ) {
          case 1:
            if ( e.data >= "3" && inputNumbersValue[1] > "1" || e.data > "3" || e.data === "0" && inputNumbersValue[1] === "0" ) {
              input.value = inputNumbersValue.slice( 1, 2 ) + "." + inputNumbersValue.slice( 2, 4 ) + "." + inputNumbersValue.slice( 4 );
              moveCursor( input, selectionStart, -1 );
              return;
            }
            // debugger
              
            input.value = inputNumbersValue.slice( 0, 2 ) + "." + inputNumbersValue.slice( 2, 4 ) + "." + inputNumbersValue.slice( 4 ); 
            moveCursor( input, selectionStart );
            return;
    
          case 2:
            if ( e.data >= "2" && inputNumbersValue[0] === "3" || e.data === "0" && inputNumbersValue[0] === "0" ) {
              input.value = inputNumbersValue.slice( 0, 1 ) + "." + inputNumbersValue.slice( 2, 4 ) + "." + inputNumbersValue.slice( 4 );
              moveCursor( input, selectionStart, -1 );
              return
            }
            
            input.value = inputNumbersValue.slice( 0, 2 ) + "." + inputNumbersValue.slice( 2, 4 ) + "." + inputNumbersValue.slice( 4 );
            moveCursor( input, selectionStart );
            return;
    
          case 4:
            if ( e.data > "1" || e.data === "0" && inputNumbersValue[3] === "0" || e.data === "1" && inputNumbersValue[3] > 2 ) {
              input.value = inputNumbersValue.slice( 0, 2 ) + "." + inputNumbersValue.slice( 3, 4 ) + "." + inputNumbersValue.slice( 4 );        
              moveCursor( input, selectionStart, -1 );
              return;
            }
    
            input.value = inputNumbersValue.slice( 0, 2 ) + "." + inputNumbersValue.slice( 2, 4 ) + "." + inputNumbersValue.slice( 4 );
            moveCursor( input, selectionStart );
            return;
    
          case 5:
            if ( e.data > 2 && inputNumbersValue[2] >= "1" || e.data === "0" && inputNumbersValue[2] === "0" ) {
              input.value = inputNumbersValue.slice( 0, 2 ) + "." + inputNumbersValue.slice( 2, 3 ) + "." + inputNumbersValue.slice( 4 );        
              moveCursor( input, selectionStart, -1 );
              return;
            }

            input.value = inputNumbersValue.slice( 0, 2 ) + "." + inputNumbersValue.slice( 2, 4 ) + "." + inputNumbersValue.slice( 4 );
            moveCursor( input, selectionStart );
            return; 
            
          default:
            input.value = inputNumbersValue.slice( 0, 2 ) + "." + inputNumbersValue.slice( 2, 4 ) + "." + inputNumbersValue.slice( 4 );
            moveCursor( input, selectionStart, 1 );
            return
        }
      }
    return
  }

  let formattedValue= "";
  if (inputNumbersValue.length === 1) { 
    if ( inputNumbersValue > "3" ) {
      formattedValue = "";
    } else {
      formattedValue = inputNumbersValue;
    }
  }

  if ( inputNumbersValue.length === 2  ) {
    if ( inputNumbersValue[0] === "3" && e.data > "1" || inputNumbersValue[1] === "0" && inputNumbersValue[0] === "0" ) {
      formattedValue = inputNumbersValue.slice( 0, 1)
    } else {
      formattedValue = inputNumbersValue.slice( 0, 2 ) + ".";
    }
  }

  if ( inputNumbersValue.length === 3  ) {
    if ( inputNumbersValue.slice( -1 ) < 2 ) {
      formattedValue = inputNumbersValue.slice( 0, 2 ) + "." + inputNumbersValue[2];
    } else {
      formattedValue = inputNumbersValue.slice( 0, 2 ) + ".";
    }
  }

  if ( inputNumbersValue.length === 4  ) {
    if ( inputNumbersValue[2] === "1" && inputNumbersValue[3] <= "2" || inputNumbersValue[2] === "0" && inputNumbersValue[3] > 0) {
      formattedValue = inputNumbersValue.slice( 0, 2 ) + "." + inputNumbersValue[2] + inputNumbersValue[3] + ".";
    } else {
      formattedValue = inputNumbersValue.slice( 0, 2 ) + "." + inputNumbersValue[2];
    }
  }

  if ( inputNumbersValue.length >= 5 ) {
    formattedValue = inputNumbersValue.slice( 0, 2 ) + "." + inputNumbersValue.slice( 2, 4 ) + "." + inputNumbersValue.slice( 4 );
  }

  
  
  if ( inputNumbersValue.length === 8 ) {
    
    let year = +inputNumbersValue.slice( 4 );
    let month = +inputNumbersValue.slice( 2, 4 ) - 1;
    let day = + inputNumbersValue.slice( 0, 2 );
    let date = new Date( year, month, day );

    if ( !( year === date.getFullYear() && month === date.getMonth() && day === date.getDate() ) ) {
      // formattedValue = inputNumbersValue.slice( 0, 2 ) + "." + inputNumbersValue.slice( 2, 4 ) + "." + inputNumbersValue.slice( 4, 7 );
    }

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