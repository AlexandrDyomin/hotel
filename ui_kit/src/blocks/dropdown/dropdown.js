const handleDropdownListFocus = ( e ) => {
  console.log( "Событие произошло на элементе " + e.target );
  console.log( "Обработчик сработал на элементе " + e.currentTarget );
  console.log( "Обработчик сработал на фазе " + e.eventPhase );
  console.log(e);
 
}

let elem = document.querySelector( ".dropdown-list > .text-field" );
elem.addEventListener( "focus", handleDropdownListFocus );
