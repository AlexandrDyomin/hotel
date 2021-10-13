const handleTextFieldFocus = ( e ) => {
  let elem = document.querySelector( ".dropdown-list__bottom" );
  elem.style.transform="translateY( 0% )";

  elem = document.querySelector( ".dropdown-list" ).children[0];
  elem.classList.add( "text-field_border-bottom-radius_disabled" );
  elem.style.borderColor="#1F204180";
}

const handleTextFieldBlur = ( e ) => {
  let elem = document.querySelector( ".dropdown-list__bottom" );
  elem.style.transform=`translateY( -100% )`;

  elem = document.querySelector( ".dropdown-list" ).children[0];
  elem.classList.remove( "text-field_border-bottom-radius_disabled" );
  elem.style.borderColor="#1F204140";
}

const handleContainerMouseDown = ( e ) => {
  let elem = document.querySelector( ".dropdown-list" ).children[0];
  elem.removeEventListener( 'blur', handleTextFieldBlur );
}

const handleContainerMouseUp = ( e ) => {
  let elem = document.querySelector( ".dropdown-list" ).children[0];
  elem.addEventListener( 'blur', handleTextFieldBlur );
  elem.focus();
}

let elem = document.querySelector( ".dropdown-list" ).children[0];
elem.addEventListener( "focus", handleTextFieldFocus );
elem.addEventListener( "blur", handleTextFieldBlur );

elem = document.querySelector( ".dropdown-list__container" );
elem.addEventListener( "mousedown", handleContainerMouseDown );
elem.addEventListener( "mouseup", handleContainerMouseUp );






