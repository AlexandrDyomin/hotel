import "./layout/layout.js"
import "./blocks/header/header.js";
import "./blocks/footer/footer.js";
import "./blocks/search-card/search-card.js";
import "../public/pages/landing-page/index.scss";
import "../public/pages/common-style.scss";

let bgImages = [ 
  require( "../public/pages/landing-page/landing-bg1-min.jpg"),
  require( "../public/pages/landing-page/landing-bg2-min.jpg"),
  require( "../public/pages/landing-page/landing-bg3-min.jpg") 
];

let bgIndex = 0;
let bgInterval = 7000;

let bgElement = document.querySelector('.content');
function bgChange() {
  bgElement.style.backgroundImage = 'url(' + bgImages[bgIndex] + ')';
  bgIndex++;
  if (bgIndex >= bgImages.length) {
    bgIndex = 0;
  }
}
bgChange();
setInterval(bgChange, bgInterval);