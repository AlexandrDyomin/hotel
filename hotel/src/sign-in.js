import "./layout/page.js";
import "./sign-in.scss";
import "./blocks/entry-card/entry-card.js";
import { bgChange } from "./common-modules/bgChande.js";

let bgImages = [ 
  require( "./layout/bg-4-min.jpg"),
  require( "./layout/bg-1-min.jpg")
];

let bgElement = document.querySelector('.page__content');

bgChange(bgImages, bgElement, 3000);