const express = require('express')
const app = express()
app.set('view engine', 'ejs')//use embedded js to set up the tempalte engine
app.use(express.static('public'));//allows us to access all static files int he public folder
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
let apiKey = '7ccf9feda50772814e5a28060eb06681';
const request = require('request');

app.get('/', function (req, res) {
    res.render('index');
})

app.listen(3001, function () {
    console.log('Example app listening on port 3001!')
})
app.post('/', function (req, res) {
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    request(url, function (err, response, body) {
        if (err) {
            res.render('index', { weather: null, error: 'Error, please try again' });
        } else {
            let weather = JSON.parse(body)
            if (weather.main == undefined) {
                res.render('index', { weather: null, error: 'Error, please try again' });
            } else {
                let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
                res.render('index', { weather: weatherText, error: null });
            }
        }
    });
})