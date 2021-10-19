// Ищет родительский элемент
const findParent = ( initialElem, className ) => {
  while ( !initialElem.classList.contains( `${ className }` ) ) {
    initialElem = initialElem.parentElement;
  }
  return initialElem;
}

// Ищет потомка
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
export default findChild;

// возвращает слово "гость" в нужном склонении
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

// склеивает все числа из массива в одночисло
const getNumber = ( numbers ) => {
  let number = "";
    for( i of numbers ) {
      number += i;
    }
    return Number( number );
}

// возвращает список цифр, если они содержатся в строке
const findDigits = ( str ) => {
  return str.match( /[0-9]/g );
}

// ОБРАБОТЧИКИ СОБЫТИЙ
const handleButtonPlusClick = ( e ) => {
  // получаем значение счетчика
  let display = e.currentTarget.previousElementSibling;
  let meterReading = Number( display.innerText );

  // устанавливаем лимит для счетчика
  let limit = 10;
  if ( meterReading === limit ) {
    // отключаем кнопку "+"
    e.currentTarget.disabled = "true";
    return;   
  } else {
    // увеличиваем значение счетчика на 1
    meterReading += 1;
    display.innerText = meterReading;
  }

  let textField = findParent( e.currentTarget, "dropdown" ).children[0]; 
  if ( textField.value ) {
    // обновляем количество гостей
    let match = findDigits( textField.value );
    let numberGuests = getNumber( match ) + 1;
    let lastWord = getLastWord( numberGuests );   
    textField.value = `${ numberGuests } ${ lastWord }`;
  } else {
    // устанавливаем количество гостей равным 1
    let numberGuests = 1;
    textField.value = `${ numberGuests } гость`;
  }

  if ( meterReading === 1 ) {
    // меняем цвет границ и текста у кнопки "-"
    let btnMinus = e.currentTarget.parentElement.children[0];     
    btnMinus.classList.toggle( "counter__button-minus_border_dark-shade-25" );
    btnMinus.classList.toggle( "counter__button-minus_text_dark-shade-50" );

    // активируем кнопку
    btnMinus.disabled = false;
  }

  // получаем количество гостей
  let match = findDigits(textField.value);
  let numberGuests = getNumber( match );
  if ( numberGuests === 1 ) {
    // активируем кнопку "Применить"
    let dropdownList = findParent( e.currentTarget, "dropdown__list" );   
    let btnApply = findChild( dropdownList, "dropdown__button-apply" );
    btnApply.disabled = false;

    // отображаем кнопку "Очистить"
    let btnClear = findChild( dropdownList, "dropdown__button-clear" );
    btnClear.classList.toggle( "dropdown__button-clear_visibility_visible" );
  }
}

const handleButtonMinusClick = ( e ) => {
  // получаем значение счетчика
  let display = e.currentTarget.nextElementSibling;
  let meterReading = Number( display.innerText );
  if ( meterReading > 0 ) {
    // уменьшаем значение счетчика на 1
    meterReading--;
    display.innerText = meterReading;
  }

  if ( meterReading === 0 ) {
    // меняем цвет границы и текста у кнопки "-". 
    let btnMinus = e.currentTarget.parentElement.children[0];  
    btnMinus.classList.toggle( "counter__button-minus_border_dark-shade-25" );
    btnMinus.classList.toggle( "counter__button-minus_text_dark-shade-50" );
    // Деактивируем кнопку
    btnMinus.disabled = true;
  }

  // получаем предыдущее количество гостей
  let textField = findParent( e.currentTarget, "dropdown" ).children[0]; 
  let match = findDigits(textField.value);
  let numberGuests = getNumber( match );
  if ( numberGuests === 1 ) {
    // очищаем текстовое поле
    textField.value = "";

    // Отключаем кнопку "Применить"
    let dropdownList = findParent( e.currentTarget, "dropdown__list" );      
    let btnApply = findChild( dropdownList, "dropdown__button-apply" );
    btnApply.disabled = true ;

    // Скрываем кнопку "Очистить"
    let btnClear = findChild( dropdownList, "dropdown__button-clear" );
    btnClear.classList.toggle( "dropdown__button-clear_visibility_visible" );
  } else {
    // отображаем скорректированное количество гостей
    numberGuests--;
    let lastWord = getLastWord(numberGuests);   
    textField.value = `${ numberGuests } ${ lastWord }`;     
  }
}

const handleButtonApplayClick = ( e ) => {
  // получаем значения из счетчиков
  let counters = [ ...findParent(e.currentTarget, "dropdown__list").children ];
  counters = counters.slice( 0, counters.length - 1 );
  let variables = counters.map(
    ( el ) => findChild( el, "counter__display" ).innerText
  );

  // вставляем значения в скрытые поля
  let hiddenFields = [ ...findParent( e.currentTarget, "dropdown" ).lastElementChild.children ];
  hiddenFields.forEach(
    ( el, i ) => { 
      el.value = variables[i];
    }
  );
}

const handleButtonClearClick = ( e ) => {
  // получаем список счетчиков
  let counters = [ ...findParent(e.currentTarget, "dropdown__list").children ];
  counters = counters.slice( 0, counters.length - 1 );
  counters.forEach(
    ( el ) => {
      // сбрасываем значения счетчика
      findChild( el, "counter__display" ).innerText = 0;

      // меняем цвет границы и текста у кнопки "-"
      let btnMinus = findChild( el, "counter__button-minus" );
      btnMinus.classList.remove(
        "counter__button-minus_border_dark-shade-25",
        "counter__button-minus_text_dark-shade-50"
      );

      // Деактивируем кнопку
      btnMinus.disabled = true;
    }
  );

  // скрываем кнопку "Очистить"
  e.currentTarget.classList.remove( "dropdown__button-clear_visibility_visible" )

  // очищаем текстовое поле списка
  findParent( e.currentTarget, "dropdown").children[0].value = "";

  //  деактивируем кнопку "применить"
  e.currentTarget.nextElementSibling.disabled = true;
    
  // сбрасываем значения в скрытых текстовых полях
  let hiddenFields = [ ...findParent( e.currentTarget, "dropdown" ).lastElementChild.children ];
  hiddenFields.forEach(
    ( el ) => { 
      el.value = "";
    }
  );
}

// ДОБАВЛЯЕМ ОБРАБОТЧИКИ СОБЫТИЙ
const addHendler = ( elements, handler, event = "click" ) => {
  elements.forEach( 
    ( elem ) => {  
      elem.addEventListener( event, handler ) 
    }
  );
}

let elements = document.querySelectorAll( ".counter__button-plus" );
addHendler( elements,  handleButtonPlusClick );

elements = document.querySelectorAll( ".counter__button-minus" );
addHendler( elements,  handleButtonMinusClick );

elements = document.querySelectorAll( ".dropdown__button-apply" );
addHendler( elements, handleButtonApplayClick)

elements = document.querySelectorAll(".dropdown__button-clear"); 
addHendler( elements, handleButtonClearClick );

