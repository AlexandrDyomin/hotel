import "./layout/layout.js"
import "./blocks/search-card/search-card.js";
import { bgChange } from "./common-modules/bgChande.js";
import "../public/pages/landing-page/index.scss";

let bgImages = [ 
  require( "../public/pages/landing-page/landing-bg2-min.jpg"),
  require( "../public/pages/landing-page/landing-bg3-min.jpg"), 
  require( "../public/pages/landing-page/landing-bg1-min.jpg")
];
let bgElement = document.querySelector('.content');

bgChange(bgImages, bgElement, 3000);
