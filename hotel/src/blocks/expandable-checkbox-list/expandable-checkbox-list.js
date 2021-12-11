import "./expandable-checkbox-list.scss";
import { changeAppearance } from "../counter/counter.js";
import addHandler from "../../common-modules/addHandler.js";
import { findChild, findElement } from "../../common-modules/scan.js";

// раскрывает список
const openList = (element, ...modifiers) => {
  // раскрываем список
  changeAppearance( element, modifiers[0] );
  setTimeout(
    () => {
      let checkboxListItems = findChild(element, "expandable-checkbox-list__items");
      changeAppearance( checkboxListItems,  modifiers[1] );

      // поворачиваем стрелку на 180 градусов
      let arrow = findElement(
        element,
        "expandable-checkbox-list",
        "expandable-checkbox-list__arrow"
      );
      changeAppearance( arrow, modifiers[2] )
    }
  );
}

// скрывает список
const closeList = (element, ...modifiers) => {
  // скрываем список 
  changeAppearance( element, modifiers[0] );
  
  // стилизуем элемент
  setTimeout(
    () => {
      let checkboxListBottom = findElement( 
        element, "expandable-checkbox-list", 
        "expandable-checkbox-list__bottom" 
      );
      changeAppearance( checkboxListBottom, modifiers[1] );
    }, 
    300
  );

  // поворачиваем стрелку на 180 градусов
  let arrow = findElement(
    element,
    "expandable-checkbox-list",
    "expandable-checkbox-list__arrow"
  );
  changeAppearance( arrow, modifiers[2] ) 
}

const handleCheckboxListMouseDown = ( e ) => {
  // выходим если клик произошел не на верхней части списка
  if ( e.target.dataset.location !== "top") {
    return;
  }

  // если список раскрыт, закрываем его, иначе открываем
  let checkboxListBottom = findElement( e.currentTarget, "expandable-checkbox-list",  "expandable-checkbox-list__bottom" );
  let isVisible = checkboxListBottom.classList.contains( "expandable-checkbox-list__bottom_visible" );
  let checkboxListItems = findChild( checkboxListBottom, "expandable-checkbox-list__items" );
  if ( isVisible ) {
    closeList( 
      checkboxListItems, 
      "expandable-checkbox-list__items_closed",  
      "expandable-checkbox-list__bottom_visible",
      "expandable-checkbox-list__arrow_open"
    );
  } else {
    openList( 
      checkboxListBottom, 
      "expandable-checkbox-list__bottom_visible", 
      "expandable-checkbox-list__items_closed",
      "expandable-checkbox-list__arrow_open" 
    );
  }
}

const handleCheckboxListFocus = ( e ) => {
  // если при получении фокуса список не раскрыт, раскрываем его
  let checkboxListBottom = findElement( e.currentTarget, "expandable-checkbox-list",  "expandable-checkbox-list__bottom" );
  let isVisible = checkboxListBottom.classList.contains( "expandable-checkbox-list__bottom_visible" );
  if ( !isVisible ) {
    openList( 
      checkboxListBottom, 
      "expandable-checkbox-list__bottom_visible", 
      "expandable-checkbox-list__items_closed"
    );    
  }
}

const handleCheckboxListFocusOut = ( e ) => {
  // ничего не делаем если фокус перешел на текстове поле
  let checkboxList = e.currentTarget; 
  let checkboxListItems = findChild( checkboxList, "expandable-checkbox-list__items" );
  let checkboxListBottom = findElement( checkboxList, "expandable-checkbox-list",  "expandable-checkbox-list__bottom" );
  let isVisible = checkboxListBottom.classList.contains( "expandable-checkbox-list__bottom_visible" );
  
  setTimeout(() => {
    // если елемент, на который перешел фокус не является
    // частью выпадающего списка и список раскрыт, то сворачиваем его
    if ( document.activeElement.dataset.parent !== "checkboxList" &&
    document.activeElement !== checkboxList && isVisible) {
      closeList( 
        checkboxListItems, 
        "expandable-checkbox-list__items_closed",  
        "expandable-checkbox-list__bottom_visible"
      );
    } 
  });
}

// ДОБАВЛЯЕМ ОБРАБОТЧИКИ СОБЫТИЙ
addHandler(
  document.querySelectorAll( ".expandable-checkbox-list" ),
  handleCheckboxListMouseDown,
  "mousedown"
);


addHandler(
  document.querySelectorAll( ".expandable-checkbox-list" ),
  handleCheckboxListFocus,
  "focus"
);

addHandler(
  document.querySelectorAll( ".expandable-checkbox-list" ),
  handleCheckboxListFocusOut,
  "focusout"
);