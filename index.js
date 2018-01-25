const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();

const apiKey = '28856fcae079171912c6d580e357dcc5';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index', {weather: null, error: null});
})

app.post('/', function (req, res) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=`+city+`&units=imperial&appid=`+apiKey;

  request(url, function (err, response, body) {
    if(err){
      res.render('index', {weather: null, error: 'Error, enter a different value'});
    } else {
      let weather = JSON.parse(body)
      if(weather.main == undefined){
        res.render('index', {weather: null, error: 'Error, please try again'});
      } else {
        let weatherText =  weather.main.temp+  `° F `;
        let weatherText1 = weather.name;
        let weatherText2 = weather.sys.country;
        let weatherText3 = weather.weather[0].main;
        console.log(weatherText3);
        res.render('index', {weather: weatherText, country:weatherText2, state: weatherText3,name: weatherText1, error: null});
      }
    }
  });
})

app.listen(6789, function () {
  console.log('Now listening on port 6789')
});
 




