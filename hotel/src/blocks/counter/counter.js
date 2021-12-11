import "./counter.scss";
import addHandler from "../../common-modules/addHandler.js";
import { findParent, findElement } from "../../common-modules/scan.js";

// заполняет текстовые поля
const fillFields = ( textFields, values ) => {
  textFields.forEach( ( el, i ) =>  el.value = values[i] );
}

const getFormattedValue = ( counterValues, getLastWord) =>{
  let numberBedrooms = (counterValues[0] > 0) ? `${ counterValues[0] } ${ getLastWord( counterValues[0], "спальня" ) }` : "";
  let numberBeds = (counterValues[1] > 0) ? `${ counterValues[1] } ${ getLastWord( counterValues[1], "кровать" ) }` : "";
  let numberBathRooms = (counterValues[2] > 0) ? `${ counterValues[2] } ${ getLastWord( counterValues[2], "ванная комната" ) }` : "";
  let arrayOfAmenities = [ numberBedrooms, numberBeds, numberBathRooms ];
  
  let formattedValue = arrayOfAmenities.reduce( ( acc, item) => {
    if ( !item ) return acc;
    acc.push(item);  
    return acc;
  }, [] ).join(", ");

  return formattedValue;
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
    case "гость":
      if ( number === 1 ) {
        return "гость";
      } else if ( number > 1 && number < 5 ){
        return "гостя";
      } else {
        return "гостей";
      } 
      
    case "ванная комната":
      if ( number === 1 ) {
        return "ванная комната";
      } else if ( number > 1 && number < 5 ){
        return "вынных комнаты";
      } else {
        return "ванных комнат";
      } 
  }
}

// обновляет значение счетчика
const updateCounterValue = ( element, counterValue ) => {
  element.innerText = counterValue;
}

// возвращает значение счетчика
const getCounterValue = ( element ) => {
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

// очищает текстовые поля
const clearTextFields = ( textFields ) => {
  textFields.forEach(
    ( el ) => { 
      el.value = "";
    }
  );
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
    let btnMinus = findElement( btnPlus, "counter__container-left", "counter__button-minus" );
    changeAppearance(
      btnMinus, 
      "counter__button-minus_active"
    );

    // активируем кнопку
    toggleState( btnMinus );
  }

  let dropdown = findParent( btnPlus, "dropdown" );
  if ( dropdown.dataset.type === "rooms") {
    let countersDisplays = [ ...dropdown.querySelectorAll( ".counter__display" ) ];
    let counterValues = countersDisplays.map( el => Number( el.innerText ) );
    let textFieldValue = getFormattedValue(counterValues, getLastWord) 

    let textField = findElement( btnPlus, "dropdown", "text-field" );
    updateValue( textField, textFieldValue );
 
    // вставляем значения в скрытые поля
    let hiddenFields = [ ...dropdown.lastElementChild.children ];
    fillFields(hiddenFields, counterValues);
  } else {
    let textField = findElement( btnPlus, "dropdown", "text-field" ); 
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
      let btnApply = findElement( btnPlus, "dropdown__list", "dropdown__button-apply" );
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
    // отключаем кнопку "+" и переводим фокус на кнопку "-"
    toggleState( btnPlus );
    let btnMinus = findElement( btnPlus, "counter__container-left", "counter__button-minus" );
    btnMinus.focus();
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
      "counter__button-minus_active"
    );
    // Деактивируем кнопку
    toggleState( btnMinus );

    // делаем фокус на кнопке "+"
    let btnPlus = findElement(btnMinus, "counter__container-left", "counter__button-plus");
    btnPlus.focus();
  }

  let dropdown = findParent( btnMinus, "dropdown" );
  if ( dropdown.dataset.type === "rooms") {
    let countersDisplays = [ ...dropdown.querySelectorAll( ".counter__display" ) ];
    let counterValues = countersDisplays.map( el => Number( el.innerText ) );
    let textFieldValue = getFormattedValue(counterValues, getLastWord)

    let textField = findElement( btnMinus, "dropdown", "text-field" );
    updateValue( textField, textFieldValue );

    // вставляем значения в скрытые поля
    let hiddenFields = [ ...dropdown.lastElementChild.children ];
    hiddenFields.forEach(
      ( el, i ) => { 
        el.value = counterValues[i];
      }
    );
    
  } else {
    let textField = findElement( btnMinus, "dropdown", "text-field" );
    // получаем предыдущее количество гостей
    let numberGuests = getNumber( textField );
    if ( numberGuests === 1 ) {
      // очищаем текстовое поле
      clearTextFields( [ textField ] );
  
      // Отключаем кнопку "Применить"
      let btnApply = findElement( btnMinus, "dropdown__list", "dropdown__button-apply" );
      toggleState( btnApply );
  
      // Скрываем кнопку "Очистить"
      let btnClear = findElement( btnMinus, "dropdown__list", "dropdown__button-clear" );
      changeAppearance( btnClear, "dropdown__button-clear_visible" );
    } else {
      numberGuests--; 
      let value = `${ numberGuests } ${ getLastWord( numberGuests, "гость" ) }`;
      updateValue( textField, value );
    }
  }
 
  // разблокируем кнопку "+", если заблокирована
  let btnPlus = findElement(btnMinus, "counter__container-left", "counter__button-plus");
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

export { 
  changeAppearance, 
  toggleState, 
  fillFields, 
  getCounterValue, 
  updateCounterValue,
  clearTextFields
};