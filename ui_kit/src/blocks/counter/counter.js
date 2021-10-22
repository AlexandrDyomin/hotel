import scan from "../../common-modules/scan.js";
import addHandler from "../../common-modules/addHandler.js";

// возвращает слово "гость" в нужном склонении
const getLastWord = ( number ) => {
  let lastWord = "";
    if ( number === 1 ) {
      return lastWord = "гость";
    } else if ( number > 1 && number < 5 ){
      return lastWord = "гостя";
    } else {
      return lastWord = "гостей";
    }
} 

// склеивает все числа из массива в одночисло
const getNumber = ( numbers ) => {
  let number = "";
    for( let i of numbers ) {
      number += i;
    }
    return Number( number );
}

// возвращает список всех цифр, если они содержатся в строке
const findDigits = ( str ) => {
  return str.match( /[0-9]/g );
}

// ОБРАБОТЧИКИ СОБЫТИЙ
const handleButtonPlusClick = ( e ) => {
  // получаем значение счетчика
  let btnPlus = e.currentTarget;
  let display = btnPlus.previousElementSibling;
  let counterValue = Number( display.innerText );

  // увеличиваем значение счетчика на 1
  counterValue += 1;
  display.innerText = counterValue;

  let textField = scan.findParent( btnPlus, "dropdown" ).firstElementChild; 
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

  if ( counterValue === 1 ) {
    // меняем цвет границ и текста у кнопки "-"
    let btnMinus = btnPlus.parentElement.firstElementChild;     
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
    let btnApply = scan.findElement( btnPlus, "dropdown__list", "dropdown__button-apply" );
    btnApply.disabled = false;

    // отображаем кнопку "Очистить"
    let btnClear = btnApply.previousElementSibling;
    btnClear.classList.toggle( "dropdown__button-clear_visibility_visible" );
  }

  // устанавливаем лимит для счетчика
  let limit = 10;
  if ( counterValue === limit ) {
    // отключаем кнопку "+"
    btnPlus.disabled = "true";
  }
}

const handleButtonMinusClick = ( e ) => {
   // получаем значение счетчика
  let btnMinus = e.currentTarget;
  let display = btnMinus.nextElementSibling;
  let counterValue = Number( display.innerText );
  if ( counterValue > 0 ) {
    // уменьшаем значение счетчика на 1
    counterValue--;
    display.innerText = counterValue;
  }

   

  if ( counterValue === 0 ) {
    // меняем цвет границы и текста у кнопки "-". 
    btnMinus.classList.toggle( "counter__button-minus_border_dark-shade-25" );
    btnMinus.classList.toggle( "counter__button-minus_text_dark-shade-50" );
    // Деактивируем кнопку
    btnMinus.disabled = true;
  }

  // получаем предыдущее количество гостей
  let textField = scan.findParent( btnMinus, "dropdown" ).firstElementChild; 
  let match = findDigits( textField.value );
  let numberGuests = getNumber( match );
  if ( numberGuests === 1 ) {
    // очищаем текстовое поле
    textField.value = "";

    // Отключаем кнопку "Применить"
    let btnApply = scan.findElement( btnMinus, "dropdown__list", "dropdown__button-apply" );
    btnApply.disabled = true ;

    // Скрываем кнопку "Очистить"
    let btnClear = scan.findElement( btnMinus, "dropdown__list", "dropdown__button-clear" );
    btnClear.classList.toggle( "dropdown__button-clear_visibility_visible" );
  } else {
    // отображаем скорректированное количество гостей
    numberGuests--;
    let lastWord = getLastWord(numberGuests);   
    textField.value = `${ numberGuests } ${ lastWord }`;     
  }

  // разблокируем кнопку "+", если заблокирована
  let btnPlus = scan.findElement(e.currentTarget, "counter__container-left", "counter__button-plus");
  if (btnPlus.disabled) {
    btnPlus.disabled = false;
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