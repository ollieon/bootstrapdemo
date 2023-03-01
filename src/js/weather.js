'use strict'

import _ from 'lodash';

function weatherTest() {
    
    let london = {};
    console.log(london);
    console.log(london.coord)
    
    setTimeout(() => {
        console.log(london)
    }, 5000); // ok this works
    
    // URL (required), options (optional)
    fetch('https://api.openweathermap.org/data/2.5/weather?q=London&APPID=fa207dc27d73391694dea65c7ab4cf83',
    { mode: 'cors' })
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
}
        

export {
    weatherTest
}