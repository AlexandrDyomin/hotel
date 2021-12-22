import "./layout/page.js";
import "./registration.scss";
import "./blocks/registration-card/registration-card.js";
import { bgChange } from "./common-modules/bgChande.js";

let bgImages = [ 
  require( "./layout/bg-4-min.jpg"),
  require( "./layout/bg-5-min.jpg")
];

let bgElement = document.querySelector('.page__content');

bgChange(bgImages, bgElement, 3000);