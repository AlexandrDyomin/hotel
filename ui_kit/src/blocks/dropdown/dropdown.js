import findChild from "../counter/counter";
// ОБРАБОТЧИКИ СОБЫТИЙ
const handleTextFieldFocus = ( e ) => {
  // раскрываем список
  let dropdownList = findChild(e.currentTarget.nextElementSibling, "dropdown__list");  
  dropdownList.style.transform = "translateY( 0% )";

  // стилизуем границы текстового поля
  let modifier = "text-field_border-bottom-radius_disabled";
  e.currentTarget.classList.add( modifier );
}

const handleTextFieldBlur = ( e ) => {
  // скрываем список
  let dropdownList = findChild(e.currentTarget.nextElementSibling, "dropdown__list");  
  dropdownList.style.transform = "translateY( -110% )";
  
  let textField = e.currentTarget;
  // стилизуем границы элемента
  setTimeout(
    () => {
      let modifier = "text-field_border-bottom-radius_disabled";
      textField.classList.remove( modifier ); 
    }, 
    300
  );
}

const handleContainerMouseEnter = ( e ) => {
  // удаляем обработчик
  let elem = document.querySelector( ".dropdown" ).children[0];
  elem.removeEventListener( 'blur', handleTextFieldBlur );
}

const handleContainerMouseLeave = ( e ) => {
  // добавляем обработчик
  let elem = document.querySelector( ".dropdown" ).children[0];
  elem.addEventListener( 'blur', handleTextFieldBlur );
  elem.focus();
}

// ДОБАВЛЯЕМ ОБРАБОТЧИКИ СОБЫТИЙ
let elem = document.querySelectorAll( ".dropdown" );
elem.forEach(
  elem => {
    elem.firstElementChild.addEventListener( "focus", handleTextFieldFocus );
    elem.firstElementChild.addEventListener( "blur", handleTextFieldBlur );   
  }
);

elem = document.querySelectorAll( ".dropdown__list" )
elem.forEach(
  elem => {
    elem.addEventListener( "mouseenter", handleContainerMouseEnter );
    elem.addEventListener( "mouseleave", handleContainerMouseLeave );
  }
);
