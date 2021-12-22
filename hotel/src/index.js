import "./layout/page.js";
import "./index.scss";
import "./blocks/search-card/search-card.js";
import { bgChange } from "./common-modules/bgChande.js";

let bgImages = [ 
  require( "./layout/bg-2-min.jpg"),
  require( "./layout/bg-3-min.jpg"), 
  require( "./layout/bg-1-min.jpg")
];
let bgElement = document.querySelector('.page__content_bg-landing');

bgChange(bgImages, bgElement, 3000);
