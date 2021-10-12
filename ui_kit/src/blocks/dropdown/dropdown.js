const handleDropdownListFocus = ( e ) => {
  let elem = document.querySelector(".dropdown-list__bottom");
  heightElem = elem.offsetHeight;
  elem.style.transform=`translateY( -${ heightElem }px )`
  // console.log(heightElem);
 
}

let elem = document.querySelector( ".dropdown-list > .text-field" );
elem.addEventListener( "focus", handleDropdownListFocus );
