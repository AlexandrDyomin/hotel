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

// возвращает слово в нужном склонении
const getLastWord = ( number ) => {
  let lastWord = "";
    if ( number === 1 ) {
      return lastWord = "гость";
    } else if ( number > 1 && number < 5 ){
      return lastWord = "гостя";
    } else {
      return lastWord = "гостей"
    }
} 

const getNumber = (numbers) => {
  let number = "";
    for(i of numbers) {
      number += i;
    }
    return Number(number);
}

// меняет placeholder в выпадаещем списке
const changePlaceholder = ( initialElem, textFieldClass ) => {
  let textField = findParent( initialElem, textFieldClass ).children[0];
  let placeholder = textField.placeholder;
  let numberGuests = 0;

  // проверяем placeholder на содержание цифр
  let match = placeholder.match( /[0-9]/g );

  // получаем число гостей из placeholder
  // если была нажата кнопка "+" прибавляем к нему 1, иначе отнимаем 1
  if ( match ) {
    if ( initialElem.classList.contains( "counter__button-plus" ) ) {
      numberGuests = getNumber( match ) + 1;
    } else {
      numberGuests = getNumber( match ) - 1;
    }

    // анализируем склонение последнего слова, обновляем текст в placeholder
    let lastWord = getLastWord(numberGuests);   
    textField.placeholder = `${ numberGuests } ${ lastWord }`;
  } else {
    numberGuests = 1;
    let lastWord = getLastWord(numberGuests);
    textField.placeholder = `${ numberGuests } ${ lastWord }`;
  }
}

// ОБРАБОТЧИКИ СОБЫТИЙ
const handleButtonPlusClick = ( e ) => {
  let display = e.currentTarget.previousElementSibling;
  let number = Number( display.innerText );
  let limit = 10;
  // если счетчик достиг лимита отключаем кнопку "+"
  if ( number === limit ) {
    e.currentTarget.disabled = "true";
    return;
  }  

  // увеличиваем значение счетчика на 1
  if ( number < limit ) {
    number += 1;
    display.innerText = number;
  }

  // отображаем общее количество гостей
  changePlaceholder(e.currentTarget, "dropdown" );

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

const handleButtonMinusClick = ( e ) => {
  // уменьшаем значение счетчика на 1
  let display = e.currentTarget.nextElementSibling;
  let number = Number( display.innerText );
  if ( number > 0 ) {
    number -= 1;
    display.innerText = number;
  }

  // отображаем общее количество гостей
  let textField = findParent( e.currentTarget, "dropdown" ).children[0];
  let placeholder = textField.placeholder;
  let numberGuests = /1/.test(placeholder);

  if ( number === 0 && numberGuests ) {
    let textField = findParent(e.currentTarget, "dropdown").children[0];
    textField.placeholder = "Сколько гостей";
  } else {
    changePlaceholder(e.currentTarget, "dropdown" );
  }

  // меняем цвет границы и текста у кнопки "-". Деактивируем кнопку
  let btnMinus = e.currentTarget.parentElement.children[0];   
  if ( number === 0 && numberGuests ) {
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


const handleButtonApplayClick = ( e ) => {
  // получаем значения из счетчиков
  let counters = [ ...findParent(e.currentTarget, "dropdown__list").children ];
  counters = counters.slice( 0, counters.length - 1 );
  let variables = counters.map(
    ( el ) => findChild(el, "counter__display").innerText
  );

  // вставляем значения в скрытые поля
  let hiddenFields = [ ...findParent( e.currentTarget, "dropdown" ).lastElementChild.children ];
  hiddenFields.map(
    ( el, i ) => { 
      el.value = variables[i];
    }
  );
}

const handleButtonClearClick = ( e ) => {
  // сбрасываем значения счетчиков
  let counters = [ ...findParent(e.currentTarget, "dropdown__list").children ];
  counters = counters.slice( 0, counters.length - 1 );
  counters.map(
    ( el ) => findChild(el, "counter__display").innerText = 0
  );

  // блокируем кнопки "-"

  // скрываем кнопку "Очистить"

  let dropdownList = findParent( e.currentTarget, "dropdown__list" );
  let btnMinus = findChild( dropdownList, "counter__button-minus" );
  if ( number === 0 && numberGuests ) {
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




  // сбрасываем значения в скрытых текстовых полях
  {
    
  }

  // устанавливаем placeholder
  let textField = findParent( e.currentTarget, "dropdown" ).children[0];
  textField.placeholder = "Сколько гостей";

}

// ДОБАВЛЯЕМ ОБРАБОТЧИКИ СОБЫТИЙ
const addHendler = ( elements, handler ) => {
  // let displays = document.querySelectorAll( ".counter__display" )
  elements.forEach( 
    ( elem, index ) => {  
      elem.addEventListener( "click", handler ) 
    }
  );
}

let elements = document.querySelectorAll( ".counter__button-plus" );
addHendler( elements,  handleButtonPlusClick );

elements = document.querySelectorAll( ".counter__button-minus" );
addHendler( elements,  handleButtonMinusClick );

elem = document.querySelector( ".dropdown__button-apply" );
elem.addEventListener( "click",  handleButtonApplayClick );

elem = document.querySelector(".dropdown__button-apply"); 
elem.addEventListener( "click", handleButtonApplayClick );

elem = document.querySelector(".dropdown__button-clear"); 
elem.addEventListener( "click", handleButtonClearClick );
