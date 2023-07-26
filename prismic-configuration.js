const Prismic = require('prismic-javascript');

// .env-Variablen laden
require('dotenv').config();

const apiEndpoint = process.env.PRISMIQ_API;
const accessToken = process.env.PRISMIQ_TOKEN;

Prismic.api(apiEndpoint, {accessToken}).then(function(api) {
  return api.query(
    Prismic.Predicates.at('document.type', 'homepage')
  ); 
}).then(function(response) {
  console.log("Documents: ", response.results);
}, function(err) {
  console.log("Something went wrong: ", err);
});