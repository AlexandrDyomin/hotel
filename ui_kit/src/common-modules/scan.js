// ищет предка с заданным классом
// в качестве аргументов принимает initialElem - элемент,
// с которого начнется поиск, targetClassName - класс искомого элемента
const findParent = ( initialElem, targetClassName ) => {
  while ( !initialElem.classList.contains( `${ targetClassName }` ) ) {
    initialElem = initialElem.parentElement;
  }
  return initialElem;
}

// ищет потомка с заданным классом
// в качестве аргументов принимает initialElem - элемент,
// с которого начнется поиск, targetClassName - класс искомого элемента
const findChild = ( initialElem, targetClassName ) => {
  let children = initialElem.children;
  if ( children.length > 0 ) {
    for ( let i = 0; i < children.length; i++ ) {
      if (  children[i].classList.contains( `${targetClassName}` ) ) {
        return children[i];
      } else {
        let target = findChild( children[i], targetClassName );
        if ( target === null ) {
          continue;
        }
        return target;
      }    
    }
  }
  return null;
}

const findChildren = ( initialElem, targetClassName ) => {
  return [ ...initialElem.querySelectorAll( `.${ targetClassName }` ) ];
}

// возвращает первый найденный элемент с заданным классом
// в качестве аргументов принимает initialElem - элемент,
// с которого начнется поиск, commonParentClassName - класс общего предка искомого
// элемента и initialElem, target - класс искомого элемента
const findElement = ( initialElem, commonParentClassName, targetClassName ) => {
  let parent = findParent( initialElem, commonParentClassName );
  let trgt = findChild( parent, targetClassName );
  return trgt;
} 

const scan = { findParent, findChild, findElement };
export { findParent, findChild, findElement, findChildren }
export default scan; 