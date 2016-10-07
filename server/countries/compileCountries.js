const source = require('./allcountries.js');
const fs = require('fs');


let allCountries = {};

source.forEach((country) => {
  allCountries[country.name] = {lat: country.latlng[0], long: country.latlng[1]};
});

console.log(allCountries);

fs.writeFileSync(`${__dirname}/countriesJSON.js`, JSON.stringify(allCountries));

