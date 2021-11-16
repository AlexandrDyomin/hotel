import "./range-slider.scss";
import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';

let slider = document.getElementById('slider');

noUiSlider.create(slider, {
    start: [5000, 10000],
    connect: true,
    step: 500,
    range: {
        'min': 0,
        'max': 15000
    } 
});

let prices = [ 
  document.getElementById("price-start"),
  document.getElementById("price-end") 
];

slider.noUiSlider.on( "update", ( values, handle ) => {
  let price = Math.round( values[handle] ).toString();
  if ( price.length > 3 ) {
    let priceLength = price.length;
    price = price.slice(0, priceLength - 3 ) + " " + price.slice(-3) + "₽";
    prices[handle].value = price;
  } else {
    prices[handle].value = price + "₽";
  }

});