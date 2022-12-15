// Setting up routes for API and HTML
const api = require('./routes/api');
const html = require('./routes/html');
// Setting up Express
const express = require('express');
const PORT = process.env.PORT || 3001
//Setting up a variable to hold the express function
const app = express();

//Setting up the middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

//Routes - API and HTML
app.use('/api', api);
app.use('/', html);

//Listener
app.listen(PORT, () => {
  console.log('App started at http://localhost:${PORT}.')
});