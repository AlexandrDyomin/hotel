import "./side-bar.scss";
import "../../blocks/label/label.scss";
import "../../blocks/dropdown/dropdown.js";
import "../../blocks/range-slider/range-slider.js";
import "../../blocks/checkbox-button/checkbox-button.js";
import "../../blocks/filter-date-dropdown/filter-date-dropdown.js";
import "../../blocks/expandable-checkbox-list/expandable-checkbox-list.js";
import "../../blocks/mask/mask.scss";
import { handleMaskClick } from "../../blocks/mask/mask.js";
import addHandler from "../../common-modules/addHandler";

addHandler(
  document.querySelectorAll(".room-cards__button"),
  handleFilterButtonClick
);

function handleFilterButtonClick( e ) {
  let $sideBar = document.querySelector( ".side-bar" );
  $sideBar.classList.toggle( "side-bar_active" );

  if ( $sideBar.classList.contains( "side-bar_active" ) ) {
    document.body.style.overflow = "hidden";

    let $mask = document.createElement("div");
    $mask.classList.add("mask", "mask_full");

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