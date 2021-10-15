const getButtonApply = ( initialElem ) => {
  let targetElem = initialElem;
  while ( !targetElem.classList.contains( "dropdown__list" ) ) {
    targetElem = targetElem.parentElement;
  }
  while ( !targetElem.classList.contains( "dropdown__button-apply" ) ) {
    targetElem = targetElem.lastElementChild;
  }
  return targetElem;
}
// ОБРАБОТЧИКИ СОБЫТИЙ

const makeButtonPlusClickHandler = ( display ) => {
  return( 
    ( e ) => {
      let number = Number( display.innerText );
      let limitGuests = 99;
      if ( number < 10 ) {
        number += 1;
        display.innerText = number;
      }

      let btnMinus = e.currentTarget.parentElement.children[0];
      
      if ( number > 0 && number < 2) {
        btnMinus.style.borderColor = "#1F204140";
        btnMinus.style.color = "#1F204180";
      }

      if ( number === 1 ) {
        let btnApply = getButtonApply( e.currentTarget );
        btnApply.removeAttribute("disabled");
      }

    }
  );
}




const makeButtonMinusClickHandler = ( display ) => {
  return(
    ( e ) => {
      let number = Number( display.innerText );
      if ( number > 0 ) {
        number -= 1;
        display.innerText = number;
      }

      let btnMinus = e.currentTarget.parentElement.children[0];
    
      if ( number === 0 ) {
        btnMinus.style.borderColor = "#1F20410A";
        btnMinus.style.color = "#1F204140";
      }
    }
  );
}

const handleButtonApplayClick = () => {
  let dropdown = document.querySelector( ".dropdown" ).children[0];
  let displays = [ ...document.querySelectorAll( ".counter__display" ) ];
  
  let numberGuests = displays.reduce( 
    ( sum, elem ) => {
      return sum += Number(elem.innerText);   
    },
    0
  );

  let lastWord = ""
  if ( numberGuests ===1 ) {
    lastWord = "гость";
  } else if ( numberGuests > 1 && numberGuests < 5 ){
    lastWord = "гостя";
  } else {
    lastWord = "гостей"
  }
  
  dropdown.setAttribute("placeholder", `${ numberGuests } ${ lastWord }`);
}

// ДОБАВЛЯЕМ ОБРАБОТЧИКИ СОБЫТИЙ
const addHendler = ( elements, handler ) => {
  let displays = document.querySelectorAll( ".counter__display" )
  elements.forEach( 
    ( elem, index ) => {  
      elem.addEventListener( "click", handler(displays[index]) ) 
    }
  );
}

let elements = document.querySelectorAll( ".counter__button-plus" );
addHendler( elements,  makeButtonPlusClickHandler );

elements = document.querySelectorAll( ".counter__button-minus" );
addHendler( elements,  makeButtonMinusClickHandler );

elem = document.querySelector( ".dropdown__button-apply" );
elem.addEventListener( "click",  handleButtonApplayClick );