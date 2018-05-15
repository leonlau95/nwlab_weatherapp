const express = require('express');
const server = express();
const hbs = require('hbs');
const axios = require('axios');
const bodyParser = require('body-parser');

server.use(bodyParser.urlencoded( {extended: true} ));

server.set('view engine','hbs');
hbs.registerPartials(__dirname + '/views/partials');

server.get('/', (req,res) => {
  res.render('main.hbs');
});

server.get('/main', (req,res) => {
  res.render('main.hbs');
});

server.get('/result', (req,res) => {
  res.render('result.hbs');
});

server.post('/form', (req,res) => {
  res.render('form.hbs');
});

server.post('/getweather', (req,res) => {
  const addr = req.body.address;

  const locationReq = `https://maps.googleapis.com/maps/api/geocode/json?address=${addr}&key=AIzaSyBkUVxs91pzUSiMU2DpGs7tO5tjUaZ_Z_k`;

  axios.get(locationReq).then((response) => {
    console.log(response.data.results[0].formatted_address);
    const lat = response.data.results[0].geometry.location.lat;
    const lng = response.data.results[0].geometry.location.lng;
    const weatherReq = `https://api.darksky.net/forecast/336fa9f0ab64e4b0f638841ff3feb4cc/${lat},${lng}`;
    return axios.get(weatherReq);
  }).then((response) => {

    res.render('result.hbs', {
      address: addr,
      summary: response.data.currently.summary,
      temperature: (response.data.currently.temperature - 32) * 0.5556,
    });

    console.log(response.data.currently.summary);
    const temp = (response.data.currently.temperature - 32) * 0.5556;
    const temperature = temp.toFixed(2);
    console.log(`${temp} Celsius`);
  })
  .catch((error) => {
    console.log(error.code);
  });
});

server.get('/about',(req, res) => {
  res.render('about.hbs', {
    currentdate: new Date().toDateString(),
  });
});

server.get('/form',(req, res) => {
  res.render('form.hbs');
});

server.listen(3000, () => {
  console.log("server listening on port 3000!!");
});
