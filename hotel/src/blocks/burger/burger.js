import "./burger.scss";
import "../mask/mask.scss";
import addHandler from "../../common-modules/addHandler.js";
import { handleMaskClick } from "../../blocks/mask/mask.js";


addHandler(
  document.querySelectorAll(".burger"),
  handleBurgerClick
);

addHandler(
  document.querySelectorAll(".burger__content"),
  handleBurgerContentClick
);

function handleBurgerClick( e ) {
  let $burger = e.currentTarget;
  $burger.classList.toggle("burger_active");

  if ( $burger.classList.contains( "burger_active" ) ) {
    document.body.style.overflow = "hidden";

    let $mask = document.createElement("div");
    $mask.classList.add("mask");

    let $page = document.querySelector( ".page" )
    $page.append($mask);
    
    addHandler(
      document.querySelectorAll( ".mask" ),
      handleMaskClick
    );
  } else {
    document.body.style.overflow = "auto";

    let $mask = document.querySelector( ".mask" );
    $mask.remove();
  }
}

function handleBurgerContentClick( e ) {
  e.stopPropagation();
}