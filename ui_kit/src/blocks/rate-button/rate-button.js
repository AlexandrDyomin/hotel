import { findChildren, findParent } from "../../common-modules/scan.js"
import addHandler from "../../common-modules/addHandler.js"

const handleBtnClick = ( e ) => {
  let rateButton = findParent( e.currentTarget, "rate-button");
  let stars = findChildren( rateButton, "star__style");
  let value = e.currentTarget.value;

  if ( rateButton.dataset.rating === e.currentTarget.value ) {
    // снимаем выделение со всех звезд
    for ( let i = 0; i < stars.length; i++ ) {
      if ( i === rateButton.dataset.rating - 1 ) {
        e.currentTarget.checked = false;
        rateButton.dataset.rating = 0;
        return
      } else {
        stars[i].classList.remove( "star__style_active" );
      }
    }
  } else {
    // меняем внешний вид звезд слева от выбранной звезды
    let counter = value;
    while ( counter ) {
    stars[counter-1].classList.add("star__style_active");
    counter--;
    }
    // меняем внешний вид звезд справа от выбранной звезды
    counter = value;
    while (counter <= stars.length) {
    stars[counter-1].classList.remove("star__style_active");
    counter++;
    }
    // устанавливаем data-атрибут для контейнера
    rateButton.dataset.rating = e.currentTarget.value;
  }
}

addHandler(
  document.querySelectorAll( ".star__btn" ),
  handleBtnClick
);