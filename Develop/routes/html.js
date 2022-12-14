// Setting up path and 
const app = require('express').Router();
const path = require('path');

// GET /notes should return the notes.html file. (From getting started section of homework)
app.get("/notes", (request, response) => {
  response.sendFile(path.join(__dirname, "../public/notes.html"));
});
// GET * should return the index.html file. (From getting started section of homework)
app.get("*", (request, response) => {
  response.sendFile(path.join(__dirname, "../public/index.html"));
});
//Exporting the app to be used in server.js
module.exports = app;