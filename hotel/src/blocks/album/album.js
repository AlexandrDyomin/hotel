import Carousel from "vanilla-js-carousel";
import "vanilla-js-carousel/vanilla-js-carousel.css";
import "./album.scss";
import "../rate-button/rate-button.js";
import "../basicInfoAboutRoom/basicInfoAboutRoom.js";

let settings =  {
  elem: "",
  infinite: true,
  interval: 3000,     
  initial: 0,          
  dots: true,          
  arrows: true,       
};

let carousels = document.querySelectorAll(".js-Carousel");
carousels.forEach( $carousel => {
    settings.elem = $carousel.id;
    new Carousel( settings );

    let arrowsPrew = document.querySelectorAll(".js-Carousel-arrowPrev");
    let arrowsNext = document.querySelectorAll(".js-Carousel-arrowNext");

    arrowsPrew.forEach( ( $button ) => $button.innerText = "" );
    arrowsNext.forEach( ( $button ) => $button.innerText = "" );
});