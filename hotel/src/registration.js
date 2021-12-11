import "./layout/layout.js";
import "./blocks/registration-card/registration-card.js";
import "../public/pages/registration/registration.scss";
import { bgChange } from "./common-modules/bgChande.js";

let bgImages = [ 
  require( "../public/pages/registration/registration-bg2-min.jpg"),
  require( "../public/pages/registration/registration-bg1-min.jpg")
];

let bgElement = document.querySelector('.content');

bgChange(bgImages, bgElement, 3000);