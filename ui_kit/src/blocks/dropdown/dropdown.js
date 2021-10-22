
import scan from "../../common-modules/scan.js";
import addHandler from "../../common-modules/addHandler.js";

// ОБРАБОТЧИКИ СОБЫТИЙ
const handleTextFieldFocus = ( e ) => {
  // раскрываем список
  let textField = e.currentTarget;
  let dropdownContainer = textField.nextElementSibling;
  dropdownContainer.classList.add( "dropdown__container_visible" ); 
  setTimeout(
    () => {
      let dropdownList = scan.findChild(dropdownContainer, "dropdown__list");
      dropdownList.classList.remove( "dropdown__list_closed" );
    }
  );
 
  // стилизуем границы текстового поля
  let modifier = "text-field_border-bottom-radius_disabled";
  textField.classList.add( modifier );
}

const handleTextFieldBlur = ( e ) => {
  // скрываем список
  let textField = e.currentTarget;
  let dropdownList = scan.findChild(textField.nextElementSibling, "dropdown__list");  
  dropdownList.classList.add( "dropdown__list_closed" );
  
  // стилизуем границы элемента
  setTimeout(
    () => {
      let modifier = "text-field_border-bottom-radius_disabled";
      textField.classList.remove( modifier );
      let dropdownContainer = textField.nextElementSibling;
      dropdownContainer.classList.remove( "dropdown__container_visible" );  
    }, 
    300
  );
}

const handleDropdownListMouseEnter = ( e ) => {
  // удаляем обработчик
  let dropdownList = e.currentTarget;
  let textField = scan.findElement( dropdownList, "dropdown", "text-field" );
  textField.removeEventListener( 'blur', handleTextFieldBlur );
}

const handleDropdownListMouseLeave = ( e ) => {
  // добавляем обработчик
  let dropdownList = e.currentTarget;
  let textField = scan.findElement( dropdownList, "dropdown", "text-field" );
  textField.addEventListener( 'blur', handleTextFieldBlur );
  textField.focus();
}


const handleButtonApplayClick = ( e ) => {
  // получаем значения из счетчиков
  let btnApply = e.currentTarget;
  let dropdownList = scan.findParent( btnApply, "dropdown__list" );
  let counters = [ ...dropdownList.children ];
  counters = counters.slice( 0, counters.length - 1 );
  let counterValues = counters.map(
    ( el ) => scan.findChild( el, "counter__display" ).innerText
  );

  // вставляем значения в скрытые поля
  let dropdown = scan.findParent( btnApply, "dropdown" );
  let hiddenFields = [ ...dropdown.lastElementChild.children ];
  hiddenFields.forEach(
    ( el, i ) => { 
      el.value = counterValues[i];
    }
  );
}

const handleButtonClearClick = ( e ) => {
  // получаем список счетчиков
  let btnClear = e.currentTarget;
  let dropdownList = scan.findParent( btnClear, "dropdown__list" );
  let counters = [ ...dropdownList.children ];
  counters = counters.slice( 0, counters.length - 1 );
  counters.forEach(
    ( el ) => {
      // сбрасываем значения счетчика
      scan.findChild( el, "counter__display" ).innerText = 0;

      // меняем цвет границы и текста у кнопки "-"
      let btnMinus = scan.findChild( el, "counter__button-minus" );
      btnMinus.classList.remove(
        "counter__button-minus_border_dark-shade-25",
        "counter__button-minus_text_dark-shade-50"
      );

      // Деактивируем кнопку
      btnMinus.disabled = true;
    }
  );

  // скрываем кнопку "Очистить"
  btnClear.classList.remove( "dropdown__button-clear_visible" );

  // очищаем текстовое поле списка
  let textField = scan.findElement( btnClear, "dropdown", "text-field" );
  textField.value = "";

  //  деактивируем кнопку "применить"
  btnClear.nextElementSibling.disabled = true;
    
  // сбрасываем значения в скрытых текстовых полях
  let dropdown = scan.findParent( btnClear, "dropdown" );
  let hiddenFields = [ ...dropdown.lastElementChild.children ];
  hiddenFields.forEach(
    ( el ) => { 
      el.value = "";
    }
  );
}

const handleTextFieldClick = ( e ) => {
  // раскрываем список
  let textField =e.currentTarget
  textField.removeEventListener("click", handleTextFieldClick)
  textField.addEventListener("click", handleTextFieldClick2);
  handleTextFieldFocus(e);
}

const handleTextFieldClick2 = ( e ) => {
  // скрываем список
  handleTextFieldBlur(e);
  let textField =e.currentTarget
  textField.removeEventListener("click", handleTextFieldClick2)
  textField.addEventListener("click", handleTextFieldClick);
}

const handleBodyClick = ( e ) => {
  let dropdowns = [ ...document.querySelectorAll( ".dropdown" ) ];
  let textFields = dropdowns.map( ( elem ) => elem.firstElementChild );
  textFields.forEach(
    ( elem ) => {
      elem.removeEventListener( "click",  handleTextFieldClick2);
      elem.addEventListener( "click",  handleTextFieldClick);
    }
  );
}

const handleDropdownClick = ( e ) => {
  e.stopPropagation();
}

// ДОБАВЛЯЕМ ОБРАБОТЧИКИ СОБЫТИЙ
let dropdowns = [ ...document.querySelectorAll( ".dropdown" ) ];
let textFields = dropdowns.map( elem => elem.firstElementChild);
addHandler(
  textFields,
  handleTextFieldFocus,
  "focus"
);

addHandler(
  textFields,
  handleTextFieldBlur,
  "blur"
);

// addHandler(
//   textFields,
//   handleTextFieldClick,
//   "click"
// );

// addHandler(
//   [ document.body ],
//   handleBodyClick,
//   "click"
// );

// addHandler(
//   document.querySelectorAll(".dropdown"),
//   handleDropdownClick,
//   "click"
// );

addHandler(
  document.querySelectorAll( ".dropdown__list" ),
  handleDropdownListMouseEnter,
  "mouseenter"
);

addHandler(
  document.querySelectorAll( ".dropdown__list" ),
  handleDropdownListMouseLeave,
  "mouseleave"
);
 
addHandler(
  document.querySelectorAll( ".dropdown__button-apply" ), 
  handleButtonApplayClick
);

addHandler(
  document.querySelectorAll(".dropdown__button-clear"), 
  handleButtonClearClick 
);