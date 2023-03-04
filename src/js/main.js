'use strict'

// import * as bootstrap from 'bootstrap';
import '../scss/styles.scss'

import _, { sum } from 'lodash';
import * as weather from './weather';
import React from 'react';
import ReactDOM from 'react-dom';

// function component() {
//     const element = document.createElement('div');

//     element.innerHTML = _.join(['Hello', 'webpack'], ' ');
//     return element
// }
// document.body.appendChild(component());

weather.weatherTest();

// URL (required), options (optional)
const img = document.querySelector('img');
const btn = document.querySelector('#cat-refresh');
btn.innerText = 'Update cat.';
btn.addEventListener('click', asyncNewCat);

const displayDiv = document.querySelector('#search-result');

const giphyAPI = 'K2OpTj4mVz7k10PkVVO5t0qOJ4L8odjE';
// build giphy trending URL
const giphyTrendingURL = new URL('https://api.giphy.com/v1/gifs/translate');
giphyTrendingURL.searchParams.append('api_key',giphyAPI);
giphyTrendingURL.searchParams.append('s','cats');
console.log(giphyTrendingURL);

// load image
newCat();

const giphySearchURL = new URL('https://api.giphy.com/v1/gifs/translate');
giphySearchURL.searchParams.append('api_key',giphyAPI);
// console.log(`giphySearchURL = ${giphySearchURL}`);

const btn2 = document.querySelector('#search-btn');
btn2.addEventListener('click', () => {
    search(giphySearchURL);
});

function newCat() {
    fetch(giphyTrendingURL.href, { mode: 'cors' })
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        // console.log(data.data.images.original.url);
        // console.log(data);
        img.src = data.data.images.original.url; // what's returned in the json object
    })
    .catch(function(err) {
        console.log(err);
    });
}

function search(url) {
    let searchStr = document.querySelector('#search').value;
    console.log(searchStr);
    let searchURL = url;
    searchURL.searchParams.append( 's', searchStr );
    console.log(searchURL);

    fetch( searchURL, {mode: 'cors'})
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        // console.log(data);
        // console.log(data.data.images.original.url);


        let img = document.createElement('img');
        img.src = data.data.images.original.url;
        displayDiv.appendChild(img);
    })
    .catch(function(err) {
        console.log(err);
    })

}

async function asyncNewCat() {
    const response = await fetch(giphyTrendingURL.href, { mode: 'cors' });
    const data = await response.json() // json() returns a promise
    img.src = data.data.images.original.url; // what's returned in the json object
    // .catch(function(err) {
    //     console.log(err);
    // });
}

function doubleAfter2Seconds(x) {
    return new Promise( resolve => {
        setTimeout( () => {
            resolve( x*2 );
        }, 2000)
        ;
    })
    // .then( (res) => {
    //         console.log(res);
    // });
}

// doubleAfter2Seconds(2)
// doubleAfter2Seconds(10).then((res) => {console.log(res)});

addPromise(2).then((res) => console.log(res));
addAsync(2).then((res) => console.log(res));

function addPromise(x) {
    return new Promise( resolve => {
        doubleAfter2Seconds(10).then( a => {
            doubleAfter2Seconds(20).then ( b => {
                doubleAfter2Seconds(30).then ( c => {
                    resolve( x + a + b + c);
                })
            })
        })
    })
}

async function addAsync(x) {
    const a = await doubleAfter2Seconds(10);
    const b = await doubleAfter2Seconds(20);
    const c = await doubleAfter2Seconds(30);
    return x + a + b + c;
}

// async function addAllAsync(x) {
//     let results = await Promise.all([
//         doubleAfter2Seconds(10),
//         doubleAfter2Seconds(20),
//         let c = doubleAfter2Seconds(30),
//     ]);
//     return 
// }


async function loadJson(url) {
    let response = await fetch(url);
    if (response.status == 200) {
        let data = await response.json();
        return data;
    }

    throw new Error(response.status);
}

// loadJson('https://javascript.info/no-such-user.json')
//   .catch(alert); // Error: 404


class HttpError extends Error {
  constructor(response) {
    super(`${response.status} for ${response.url}`);
    this.name = 'HttpError';
    this.response = response;
  }
}

async function loadJson2(url) {
    let response = await fetch(url);
    if (response.status === 200) {
        return response.json();
    }
    throw new HttpError(response);
}

// Ask for a user name until github returns a valid user
async function demoGithubUser() {
    let user;

    while(true) {
        let name = prompt("Enter a name?", "iliakan");

        try {
            user = await loadJson2(`https://api.github.com/users/${name}`)
            break;
        } catch (err) {
            if (err instanceof HttpError && err.response.status == 404) {
                alert("No such user, please reenter.");
            } else {
                throw err;
            }
        }
    }

    alert(`Full name: ${user.name}.`);
    return user;
}

// demoGithubUser();



async function wait() {
  await new Promise(resolve => setTimeout(resolve, 5000));

  return 10;
}

function f() {
  // ...what should you write here?
  // we need to call async wait() and wait to get 10
  // remember, we can't use "await"
  wait().then(result => console.log(result));
}

f();

function sumRange(n) {
    if (n === 1) {
        return 1;
    }
    return (n + sumRange(n - 1));
}

console.log(sumRange(3));

function power(base, exp = 0) {
    if (exp === 0) {
        return 1;
    }
    return base * power(base, exp - 1);
}

console.log(power(2, 4))

function factorial(n) {
    if (n === 0) {
        return 1;
    }
    return n * factorial(n - 1);
}

console.log(factorial(4));

class Greeting extends React.Component {
    render() {
        return (
            <div className="box">
                <h2> Hello from react </h2>
                <p> First React component.</p>
            </div>
        )
    }
}
ReactDOM.render(<Greeting />, document.querySelector('#react-test'));