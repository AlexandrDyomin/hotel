import "./button.scss";
import "../../common-modules/addHandler"
import addHandler from "../../common-modules/addHandler.js";

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

    let $page = document.querySelector( ".content" )
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

function handleMaskClick( e ) {
  let $burger = document.querySelector(".burger");
  $burger.classList.toggle("burger_active");

  e.currentTarget.remove();

  document.body.style.overflow = "auto";
}