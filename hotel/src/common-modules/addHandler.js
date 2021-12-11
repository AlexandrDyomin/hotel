// назначает обработчик события переданным элементам
// elements: список элементов
// handler: обработчик события
// event: событие
const addHandler = ( elements, handler, event = "click" ) => {
  elements.forEach( 
    ( elem ) => {  
      elem.addEventListener( event, handler ) 
    }
  );
}

export default addHandler;