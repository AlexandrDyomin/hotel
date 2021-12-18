function handleBurgerContentClick( e ) {
  e.stopPropagation();
}

function handleMaskClick( e ) {
  let $burger = document.querySelector(".burger");
  let $sideBar = document.querySelector(".side-bar");

  if  ( $burger.classList.contains( "burger_active" ) ) {
    $burger.classList.toggle( "burger_active" );

  } else {
    $sideBar.classList.toggle("side-bar_active");

  }
  e.currentTarget.remove();
  document.body.style.overflow = "auto";
}

export { handleMaskClick };