﻿const request = require('request');

let apiKey = '7ccf9feda50772814e5a28060eb06681';
let city = 'london';
let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

request(url, function (err, response, body) {
    if (err) {
        console.log('error:', error);
    } else {
        let weather = JSON.parse(body)
        let message = `It's ${weather.main.temp} degrees in ${weather.name}!`;
        console.log(message);
    }
});