import Carousel from "vanilla-js-carousel";
import "vanilla-js-carousel/vanilla-js-carousel.css";
import "./album.scss";

let defaultSettings =  {
  elem: "",
  infinite: true,
  autoplay: true,
  interval: 3000,     
  initial: 0,          
  dots: true,          
  arrows: false,       
};

let carousels = document.querySelectorAll(".js-Carousel");
carousels.forEach( ( $carousel, index ) => {
  if ( index === 0 ) {
    let settings = { ... defaultSettings, elem: $carousel.id, arrows: true }
    new Carousel( settings );

    let arrowsPrew = document.querySelectorAll(".js-Carousel-arrowPrev");
    let arrowsNext = document.querySelectorAll(".js-Carousel-arrowNext");

    arrowsPrew.forEach( ( $button ) => $button.innerText = "" );
    arrowsNext.forEach( ( $button ) => $button.innerText = "" );
    return;
  }
  
  defaultSettings.elem = $carousel.id;
  new Carousel( defaultSettings );
});