import { basename } from "path";
import urlActive from "./favorite-min.svg";
import urlDefault from "./favorite_border-min.svg";
import { getCounterValue, updateCounterValue } from "../counter/counter.js";
import addHandler from "../../common-modules/addHandler.js";
import { findElement } from "../../common-modules/scan.js";

// возвращает url картинки
const getUrl = ( img ) => {
  return img.src;
}

// устанавливает url картинки
const setUrl = ( img, url ) => {
  img.src = url;
}

// возвращает, элемент на котором выполняется обработчик
const getCurrentElement = ( e ) => {
  return e.currentTarget;
}

// сравнивает два значения
// если они равны возвращает true, иначе false
const compareForEquality = ( operandLeft, operandRight ) => {
  if ( operandLeft === operandRight ) {
    return true;
  } else {
    return false;
  }
}

const handleHeartClick = ( e ) => {
  let img = getCurrentElement( e );
  let url = getUrl( img );
  let baseNameUrl = basename( url );
  let baseNameUrlActive = basename( urlActive );
  let isEquality = compareForEquality( baseNameUrl, baseNameUrlActive );
  let counter = findElement( img, "likes", "likes__counter" )
  let counterValue = getCounterValue( counter );

  if ( isEquality ) {
    setUrl( img, urlDefault );
    updateCounterValue( counter, counterValue - 1 );
  } else {
    setUrl( img, urlActive );
    updateCounterValue( counter, counterValue + 1 );
  }
}

addHandler(
  document.querySelectorAll( ".likes__img" ),
  handleHeartClick
);