import scan from "../../common-modules/scan.js";
import addHandler from "../../common-modules/addHandler.js";

 const fillFields = ( textFields, values ) => {
  textFields.forEach( ( el, i ) =>  el.value = values[i] );
}

// возвращает слово  в нужном склонении
const getLastWord = ( number, word  ) => {
  switch(word){
    case "спальня": 
      if ( number === 1 ) {
        return "спальня";
      } else if ( number > 1 && number < 5 ){
        return "спальни";
      } else {
        return "спален";
      }
    case "кровать":
      if ( number === 1 ) {
        return "кровать";
      } else if ( number > 1 && number < 5 ){
        return "кровати";
      } else {
        return "кроватей";
      }
    case "ванная комната":
      if ( number === 1 ) {
        return "ванная комната";
      } else if ( number > 1 && number < 5 ){
        return "ванных комнаты";
      } else {
        return "ванных комнат";
      }
    case "гость":
      if ( number === 1 ) {
        return "гость";
      } else if ( number > 1 && number < 5 ){
        return "гостя";
      } else {
        return "гостей";
      }   
  }
}

// обновляет значение счетчика
const updateCounterValue = ( element, counterValue ) => {
  // let display = e.currentTarget.nextElementSibling;
  element.innerText = counterValue;
}

// возвращает значение счетчика
const getCounterValue = ( element ) => {
  // let display = e.currentTarget.nextElementSibling;
  return Number( element.innerText );
}

// добавляет к элементу модификаторы
// удаляет модификаторы, если они уже заданы
const changeAppearance = ( element, ...modificators ) => {
  modificators.forEach( mod => element.classList.toggle( mod ) );
}
// возвращает число, содержащееся в свойстве value элемента
const getNumber = ( element ) => {
  // получаем список всех цифр 
  let value = element.value;
  let digits = value.match( /[0-9]/g );

  // склеиваем эти цифры в одно число
  let number = "";
  digits.forEach( digit => number += digit );
  return Number( number );
}

// очищает текстовое поле
const clearTextField = ( element ) => {
  element.value = "";
}

// активирует/деактивирует елемент
const toggleState = ( element ) => {
  (element.disabled) ? 
    element.disabled = false : element.disabled = true
}

// обновляем текст в текстовом поле
const updateValue = ( element, value ) => {
  element.value = value;
}

// ОБРАБОТЧИКИ СОБЫТИЙ
const handleButtonPlusClick = ( e ) => {
  let btnPlus = e.currentTarget;
  let display = btnPlus.previousElementSibling;
  // получаем значение счетчика
  let counterValue = getCounterValue( display );

  // увеличиваем значение счетчика на 1
  counterValue++;
  updateCounterValue( display, counterValue );

  if ( counterValue === 1 ) {
    // меняем цвет границ и текста у кнопки "-"
    let btnMinus = scan.findElement( btnPlus, "counter__container-left", "counter__button-minus" );
    changeAppearance(
      btnMinus, 
      "counter__button-minus_border_dark-shade-25", 
      "counter__button-minus_text_dark-shade-50" 
    );

    // активируем кнопку
    toggleState( btnMinus );
  }

  let dropdown = scan.findParent( btnPlus, "dropdown" );
  if ( dropdown.dataset.type === "rooms") {
    let countersDisplays = [ ...dropdown.querySelectorAll( ".counter__display" ) ];
    let counterValues = countersDisplays.map( el => Number( el.innerText ) );
    
    let value = `${ counterValues[0] } ${ getLastWord( counterValues[0], "спальня" ) },\
  \ ${ counterValues[1] } ${ getLastWord( counterValues[1], "кровать" ) }...`;

    let textField = scan.findElement( btnPlus, "dropdown", "text-field" );
    updateValue( textField, value );
 

    // вставляем значения в скрытые поля
    let hiddenFields = [ ...dropdown.lastElementChild.children ];
    fillFields(hiddenFields, counterValues);

    

  } else {
    let textField = scan.findElement( btnPlus, "dropdown", "text-field" ); 
    if ( textField.value ) {
      // обновляем количество гостей
      let numberGuests = getNumber( textField );
      numberGuests++; 
      let value = `${ numberGuests } ${ getLastWord( numberGuests, "гость" ) }`;
      updateValue( textField, value );
    } else {
      // устанавливаем количество гостей равным 1
      updateValue( textField, "1 гость" );
    }
  
    let numberGuests = getNumber( textField );
    if ( numberGuests === 1 ) {
      // активируем кнопку "Применить"
      let btnApply = scan.findElement( btnPlus, "dropdown__list", "dropdown__button-apply" );
      toggleState( btnApply );
  
      // отображаем кнопку "Очистить"
      let btnClear = btnApply.previousElementSibling;
      changeAppearance(
        btnClear,
        "dropdown__button-clear_visible"
      );
    }
  }

  // устанавливаем лимит для счетчика
  let limit = 10;
  if ( counterValue === limit ) {
    // отключаем кнопку "+"
    toggleState( btnPlus );
  }
}

const handleButtonMinusClick = ( e ) => {
  let btnMinus = e.currentTarget;
  let display = btnMinus.nextElementSibling;
  // получаем значение счетчика
  let counterValue = getCounterValue( display );
  if ( counterValue > 0 ) {
      // уменьшаем значение счетчика на 1
      counterValue--;
      updateCounterValue( display, counterValue );
  }

  if ( counterValue === 0 ) {
    // меняем цвет границы и текста у кнопки "-". 
    changeAppearance(
      btnMinus, 
      "counter__button-minus_border_dark-shade-25", 
      "counter__button-minus_text_dark-shade-50" 
    );
    // Деактивируем кнопку
    toggleState( btnMinus );

    // делаем фокус на кнопке "+"
    let btnPlus = scan.findElement(btnMinus, "counter__container-left", "counter__button-plus");
    btnPlus.focus();
  }

  let dropdown = scan.findParent( btnMinus, "dropdown" );
  if ( dropdown.dataset.type === "rooms") {
    let countersDisplays = [ ...dropdown.querySelectorAll( ".counter__display" ) ];
    let counterValues = countersDisplays.map( el => Number( el.innerText ) );
    
    let textFieldValue = `${ counterValues[0] } ${ getLastWord( counterValues[0], "спальня" ) },\
  \ ${ counterValues[1] } ${ getLastWord( counterValues[1], "кровать" ) }...`;

    let textField = scan.findElement( btnMinus, "dropdown", "text-field" );
    updateValue( textField, textFieldValue );

    // вставляем значения в скрытые поля
    let hiddenFields = [ ...dropdown.lastElementChild.children ];
    hiddenFields.forEach(
      ( el, i ) => { 
        el.value = counterValues[i];
      }
    );
    
  } else {
    let textField = scan.findElement( btnMinus, "dropdown", "text-field" );
    // получаем предыдущее количество гостей
    let numberGuests = getNumber( textField );
    if ( numberGuests === 1 ) {
      // очищаем текстовое поле
      clearTextField( textField );
  
      // Отключаем кнопку "Применить"
      let btnApply = scan.findElement( btnMinus, "dropdown__list", "dropdown__button-apply" );
      toggleState( btnApply );
  
      // Скрываем кнопку "Очистить"
      let btnClear = scan.findElement( btnMinus, "dropdown__list", "dropdown__button-clear" );
      changeAppearance( btnClear, "dropdown__button-clear_visible" );
    } else {
      numberGuests--; 
      let value = `${ numberGuests } ${ getLastWord( numberGuests, "гость" ) }`;
      updateValue( textField, value );
    }
  }
 
  // разблокируем кнопку "+", если заблокирована
  let btnPlus = scan.findElement(btnMinus, "counter__container-left", "counter__button-plus");
  if (btnPlus.disabled) {
    toggleState( btnPlus );
  }
}






// ДОБАВЛЯЕМ ОБРАБОТЧИКИ СОБЫТИЙ
addHandler( 
  document.querySelectorAll( ".counter__button-plus" ),  
  handleButtonPlusClick 
);

addHandler( 
  document.querySelectorAll( ".counter__button-minus" ),  
  handleButtonMinusClick 
);


let dropdowns = [ ...document.querySelectorAll( ".dropdown[data-type=rooms]" ) ];
let buttonsPlus = dropdowns.map( el => [ ...el.querySelectorAll( ".counter__button-plus" ) ] );
buttonsPlus.forEach( 
  arr => {
    arr = arr.slice( 0, arr.length -1 );
    arr.forEach( 
      el => {
        el.click();
        el.click(); 
      }
    ) ;
  }
);

export { 
  changeAppearance, 
  toggleState, 
  fillFields, 
  getCounterValue, 
  updateCounterValue
};