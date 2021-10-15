// Ищет родительский элемент
const findParent = ( initialElem, className ) => {
  while ( !initialElem.classList.contains( `${ className }` ) ) {
    initialElem = initialElem.parentElement;
  }
  return initialElem;
}

// Ищет дочерний элемент
const findChild = ( initialElem, className ) => {
  let children = initialElem.children;
  if ( children.length > 0 ) {
    for ( let i = 0; i < children.length; i++ ) {
      if (  children[i].classList.contains( `${className}` ) ) {
        return children[i];
      } else {
        let target = findChild( children[i], className );
        if ( target === null ) {
          continue;
        }
        return target;
      }    
    }
  }
  return null;
}

// ОБРАБОТЧИКИ СОБЫТИЙ
const makeButtonPlusClickHandler = ( display ) => {
  return( 
    ( e ) => {
      // увеличиваем значение счетчика на 1
      let number = Number( display.innerText );
      let limitGuests = 99;
      if ( number < 10 ) {
        number += 1;
        display.innerText = number;
      }

      // отображаем общее количество гостей
      // {

      // }

      // меняем цвет границ и текста у кнопки "-". Активируем кнопку
      let btnMinus = e.currentTarget.parentElement.children[0];     
      if ( number > 0 && number < 2) {
        btnMinus.style.borderColor = "#1F204140";
        btnMinus.style.color = "#1F204180";
        btnMinus.removeAttribute( "disabled" );
      }

      // активируем кнопку "применить" отображаем кнопку "очистить"
      if ( number === 1 ) {
        let dropdownList = findParent( e.currentTarget, "dropdown__list" );      
        let btnApply = findChild( dropdownList, "dropdown__button-apply" );
        btnApply.removeAttribute("disabled");

        let btnClear = findChild( dropdownList, "dropdown__button-clear" );
        btnClear.style.visibility = "visible";
      }
    }
  );
}

const makeButtonMinusClickHandler = ( display ) => {
  return(
    ( e ) => {
      // уменьшаем значение счетчика на 1
      let number = Number( display.innerText );
      if ( number > 0 ) {
        number -= 1;
        display.innerText = number;
      }

      // отображаем общее количество гостей
      {

      }

      // меняем цвет границы и текста у кнопки "-". Деактивируем кнопку
      let btnMinus = e.currentTarget.parentElement.children[0];   
      if ( number === 0 ) {
        btnMinus.style.borderColor = "#1F20410A";
        btnMinus.style.color = "#1F204140";
        btnMinus.setAttribute( "disabled", true );

        //  деактивируем кнопку "применить"
        let dropdownList = findParent( e.currentTarget, "dropdown__list" );      
        let btnApply = findChild( dropdownList, "dropdown__button-apply" );
        btnApply.setAttribute( "disabled", true );
        
        // скрываем кнопку "очистить"
        let btnClear = findChild( dropdownList, "dropdown__button-clear" );
        btnClear.style.visibility = "hidden";
      }
    }
  );
}

const handleButtonApplayClick = () => {
  // устанавливаем значения из счетчиков в скрытые текстовые поля
  {
    
  }

  // сворачиваем список
  {

  }

  // let dropdown = document.querySelector( ".dropdown" ).children[0];
  // let displays = [ ...document.querySelectorAll( ".counter__display" ) ];
  
  // let numberGuests = displays.reduce( 
  //   ( sum, elem ) => {
  //     return sum += Number(elem.innerText);   
  //   },
  //   0
  // );

  // let lastWord = ""
  // if ( numberGuests ===1 ) {
  //   lastWord = "гость";
  // } else if ( numberGuests > 1 && numberGuests < 5 ){
  //   lastWord = "гостя";
  // } else {
  //   lastWord = "гостей"
  // }
  // dropdown.setAttribute("placeholder", `${ numberGuests } ${ lastWord }`);
}

const handleButtonClearClick = () => {
  // сбрасываем значения счетчиков
  {

  }

  // устанавливаем placeholder
  {

  }

  // сбрасываем значения в скрытых текстовых полях
  {
    
  }
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