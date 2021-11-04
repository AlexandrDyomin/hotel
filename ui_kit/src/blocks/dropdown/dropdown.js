import { 
  changeAppearance, 
  toggleState, 
  fillFields, 
  getCounterValue, 
  updateCounterValue,
  clearTextFields
} from "../counter/counter.js";
import addHandler from "../../common-modules/addHandler.js";
import { 
  findChild, 
  findParent, 
  findElement, 
  findChildren 
} from "../../common-modules/scan.js";

// раскрывает список
const openDropdown = (element, ...modifiers) => {
  // раскрываем список
  changeAppearance( element, modifiers[0] );
  setTimeout(
    () => {
      let dropdownList = findChild(element, "dropdown__list");
      changeAppearance( dropdownList,  modifiers[1] );
    }
  );

  // стилизуем границы текстового поля
  let textField = findElement(element, "dropdown", "text-field" );
  changeAppearance( textField, modifiers[2] );
}

// скрывает список
const closeDropdown = (element, ...modifiers) => {
  // скрываем список 
  changeAppearance( element, modifiers[0] );
  
  // стилизуем границы элемента
  setTimeout(
    () => {
      let textField = findElement( element, "dropdown", "text-field" )
      changeAppearance(textField, modifiers[1] );
      let dropdownContainer = findElement( textField, "dropdown", "dropdown__container" );
      changeAppearance(dropdownContainer, modifiers[2]) 
    }, 
    300
  );
}

// ОБРАБОТЧИКИ СОБЫТИЙ
const handleButtonApplayClick = ( e ) => {
  // получаем значения из счетчиков
  let btnApply = e.currentTarget;
  let dropdownList = findParent( btnApply, "dropdown__list" );
  let counters = findChildren( dropdownList, "counter" );
  let counterValues = counters.map( el => {
    let display = findChild( el, "counter__display" );
    return getCounterValue( display );
  });

  // вставляем значения в скрытые поля
  let hiddenFields = findElement( btnApply, "dropdown", "dropdown__hidden-fields" );
  hiddenFields = findChildren( hiddenFields, "text-field" );
  fillFields( hiddenFields, counterValues);
}

const handleButtonClearClick = ( e ) => {
  // получаем список счетчиков
  let btnClear = e.currentTarget;
  let dropdownList = findParent( btnClear, "dropdown__list" );
  let counters = findChildren( dropdownList, "counter" );
  counters.forEach(
    ( el ) => {
      // меняем цвет границы и текста у кнопки "-"
      let display = findChild( el, "counter__display" );
      let btnMinus = findChild( el, "counter__button-minus" );
      if ( getCounterValue( display ) !== 0 ) {
        changeAppearance( 
          btnMinus,
          "counter__button-minus_border_dark-shade-25",
          "counter__button-minus_text_dark-shade-50"
        );

        // Деактивируем кнопку
        toggleState(btnMinus);
      }

      // сбрасываем значение счетчика
      updateCounterValue( display, "0" ); 
    }
  );

  // скрываем кнопку "Очистить"
  changeAppearance( btnClear, "dropdown__button-clear_visible" );

  // очищаем тестовые поля
  let dropdown = findParent( btnClear, "dropdown" );
  let textFields = findChildren( dropdown, "text-field" );
  clearTextFields( textFields );

  //  деактивируем кнопку "применить"
  let btnApply = findElement( btnClear, "dropdown__buttons", "dropdown__button-apply" );
  toggleState(btnApply);
    
  // делаем фокус на dropdown
  dropdown.focus();
}

const handleDropdownMouseDown = ( e ) => {
  // выходим если клик произошел не на текстовом поле
  let textField = findElement( e.currentTarget, "dropdown", "text-field" );
  if ( e.target !== textField ) {
    return;
  }

  // если список раскрыт, закрываем его, иначе открываем
  let dropdownContainer = findElement( e.currentTarget, "dropdown",  "dropdown__container" );
  let isVisible = dropdownContainer.classList.contains( "dropdown__container_visible" );
  let dropdownList = findChild( dropdownContainer, "dropdown__list" );
  if ( isVisible ) {
    closeDropdown( 
      dropdownList, 
      "dropdown__list_closed", 
      "text-field_border-bottom-radius_disabled", 
      "dropdown__container_visible"
    );
  } else {
    openDropdown( 
      dropdownContainer, 
      "dropdown__container_visible", 
      "dropdown__list_closed", 
      "text-field_border-bottom-radius_disabled" 
    );
  }
}
  
const handleDropdownFocus = ( e ) => {
  // если при получении фокуса список не раскрыт, раскрываем его
  let dropdownContainer = findElement( e.currentTarget, "dropdown",  "dropdown__container" );
  let isVisible = dropdownContainer.classList.contains( "dropdown__container_visible" );
  if ( !isVisible ) {
    openDropdown( 
      dropdownContainer, 
      "dropdown__container_visible", 
      "dropdown__list_closed", 
      "text-field_border-bottom-radius_disabled" 
    );    
  }
}

const handleDropdownFocusOut = ( e ) => {
  // ничего не делаем если фокус перешел на текстове поле
  let dropdown = e.currentTarget; 
  let dropdownList = findChild( dropdown, "dropdown__list" );
  let textField = findChild( dropdown, "text-field" );
  let dropdownContainer = findElement( e.currentTarget, "dropdown",  "dropdown__container" );
  let isVisible = dropdownContainer.classList.contains( "dropdown__container_visible" );
  
  setTimeout(() => {
    if ( document.activeElement === textField ) {
      return
    }

    // если елемент, на который перешел фокус не является
    // частью выпадающего списка и список раскрыт, то сворачиваем его

    if ( document.activeElement.dataset.parent !== "dropdown" &&
    document.activeElement !== dropdown && isVisible) {
      closeDropdown( 
        dropdownList, 
        "dropdown__list_closed", 
        "text-field_border-bottom-radius_disabled", 
        "dropdown__container_visible"
      );
    } 
  });
}

// ДОБАВЛЯЕМ ОБРАБОТЧИКИ СОБЫТИЙ
addHandler(
  document.querySelectorAll( ".dropdown" ),
  handleDropdownMouseDown,
  "mousedown"
);

addHandler(
  document.querySelectorAll( ".dropdown" ),
  handleDropdownFocus,
  "focus"
);

addHandler(
  document.querySelectorAll( ".dropdown" ),
  handleDropdownFocusOut,
  "focusout"
);

addHandler(
  document.querySelectorAll( ".dropdown__button-apply" ), 
  handleButtonApplayClick
);

addHandler(
  document.querySelectorAll(".dropdown__button-clear"), 
  handleButtonClearClick 
);