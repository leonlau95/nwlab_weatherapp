const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
.options('address')
.argv;

const addr = argv.address;

const locationReq = `https://maps.googleapis.com/maps/api/geocode/json?address=${addr}&key=AIzaSyBkUVxs91pzUSiMU2DpGs7tO5tjUaZ_Z_k`;

axios.get(locationReq).then((response) => {
  console.log(response.data.results[0].formatted_address);
  const lat = response.data.results[0].geometry.location.lat;
  const lng = response.data.results[0].geometry.location.lng;
  const weatherReq = `https://api.darksky.net/forecast/336fa9f0ab64e4b0f638841ff3feb4cc/${lat},${lng}`;
  return axios.get(weatherReq);
}).then((response) => {
  console.log(response.data.currently.summary);
  const temp = (response.data.currently.temperature - 32) * 0.5556;
  const temperature = temp.toFixed(2);
  console.log(`${temp} Celsius`);
})
.catch((error) => {
  console.log(error.code);
});
