'use strict'

import * as bootstrap from 'bootstrap';
import '../scss/styles.scss'

import _ from 'lodash';


// function component() {
//     const element = document.createElement('div');

//     element.innerHTML = _.join(['Hello', 'webpack'], ' ');
//     return element
// }
// document.body.appendChild(component());

let london = {};
let a = 5;
console.log(a);
console.log(london);
console.log(london.coord)

setTimeout(() => {
    console.log(london)
}, 5000); // ok this works

// URL (required), options (optional)
fetch('https://api.openweathermap.org/data/2.5/weather?q=London&APPID=fa207dc27d73391694dea65c7ab4cf83',
    {
        mode: 'cors'
    })
  .then(function(response) {
    // Successful response :)
      return response.json();
  })
    .then(function (response) {
        console.log(response);
        london = response;
    })
  .catch(function(err) {
    // Error :(
      console.log(err);
  });

// URL (required), options (optional)
const img = document.querySelector('img');
fetch('api.giphy.com/v1/gifs/trending&&APPID=K2OpTj4mVz7k10PkVVO5t0qOJ4L8odjE',
  {
    mode: 'cors'
  })
  .then(function(response) {
      console.log(response.json());
  })
    .then((response) => {
        console.log(response.data.images.original.url);
    })
  .catch(function(err) {
      console.log(err);
  });