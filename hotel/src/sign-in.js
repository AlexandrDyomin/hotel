import "./layouts/carcas/carcas.js";
import "./blocks/entry-card/entry-card.js";
import { bgChange } from "./common-modules/bgChande.js";
import "../public/pages/sign-in/sign-in.scss";

let bgImages = [ 
  require( "../public/pages/sign-in/sign-in-bg2-min.jpg"),
  require( "../public/pages/sign-in/sign-in-bg1-min.jpg")
];

let bgElement = document.querySelector('.content');

bgChange(bgImages, bgElement, 3000);