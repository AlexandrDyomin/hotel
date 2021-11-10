import { findChildren, findParent } from "../../common-modules/scan.js"
import addHandler from "../../common-modules/addHandler.js"

const handleBtnClick = ( e ) => {
  let rateButton = findParent( e.currentTarget, "rate-button");
  let stars = findChildren( rateButton, "star__style");
  let value = e.currentTarget.value;
  
  // меняем внешний вид звезд слева от выбранной звезды
  let counter = value;
  while ( counter ) {
    stars[counter-1].classList.add("star__btn_active");
    counter--;
  }

  // меняем внешний вид звезд справа от выбранной звезды
  counter = value;
  while (counter <= stars.length) {
    stars[counter-1].classList.remove("star__btn_active");
    counter++;
  }
}

addHandler(
  document.querySelectorAll( ".star__btn" ),
  handleBtnClick,
  "change"
);

