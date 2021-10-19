// ОБРАБОТЧИКИ СОБЫТИЙ
const handleTextFieldFocus = ( e ) => {
  let elem = document.querySelector( ".dropdown__list" );

  // раскрываем список
  elem.style.transform = "translateY( 0% )";

  // стилизуем границы элемента
  elem = document.querySelector( ".dropdown" ).children[0];
  let modifier = "text-field_border-bottom-radius_disabled";
  elem.classList.add( modifier );
  elem.style.borderColor = "#1F204180";
}

const handleTextFieldBlur = ( e ) => {
  let elem = document.querySelector( ".dropdown__list" );

  // скрываем список
  elem.style.transform = "translateY( -110% )";

  // стилизуем границы элемента
  setTimeout(
    ()=>{
      elem = document.querySelector( ".dropdown" ).children[0];
      let modifier = "text-field_border-bottom-radius_disabled";
      elem.classList.remove( modifier ); 
      elem.style.removeProperty( "border-color" ); 
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