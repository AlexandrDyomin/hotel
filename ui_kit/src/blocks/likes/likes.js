import "./likes.scss";
import addHandler from "../../common-modules/addHandler.js";
import { findElement, findParent } from "../../common-modules/scan.js";
import { 
  changeAppearance, 
  updateCounterValue, 
  getCounterValue 
} from "../counter/counter.js";

// меняет внешний вид блока
const changeAppearanceLikes = ( el ) => {
  let likes = findParent( el, "likes" );
    changeAppearance(
      likes,
      "likes_active"
    );
  
    let counter = findElement( el, "likes", "likes__counter" );
    changeAppearance(
      counter,
      "likes__counter_active"
    );
}

const handleBtnChange = ( e ) => {
  let likes = findParent( e.currentTarget, "likes" );
  changeAppearanceLikes( likes );
  
  let counter = findElement( e.currentTarget, "likes", "likes__counter" );
  let counterValue = getCounterValue( counter );

  if ( e.currentTarget.checked ) {
    updateCounterValue( counter, counterValue + 1);
  } else {
    updateCounterValue( counter, counterValue - 1);
  }
}

addHandler(
  document.querySelectorAll( ".likes__btn" ),
  handleBtnChange,
  "change"
);

let buttons = document.querySelectorAll( ".likes__btn" );
buttons.forEach( el => {
  if (el.checked) {
    changeAppearanceLikes( el );
  }
});