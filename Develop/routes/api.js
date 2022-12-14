const app = require('express').Router();
const fs = require('fs');
const path = require('path');

// Creating a random string for the note ID
const randomStr = () => {
  return Math.floor((1 + Math.random()) * 0x10000)
  .toString(16).substring(1);
}

// Getting the notes from the db.json file, parsing it, and returning it to the client
app.get("/notes", (request, response) => {
  fs.readFile(path.join(__dirname, "../db/db.json"), (err, data) => {
    if (err) throw err;
    response.json(JSON.parse(data));
  })
});

// Posting the new note to the db.json file, parsing it, and returning it to the client
app.post("/notes", (request, response) => {
  const { title, text } = request.body;
  const newNotes = {
    title,
    text,
    id: randomStr()
  }

// Reading the db.json file.
  fs.readFile(path.join(__dirname, "../db/db.json"), (err, data) => {
    if (err) throw err;
    // Creating a variable to hold the parsed data from the db.json file
    const parsedNotes = JSON.parse(data);
    // Pushing the new note to the parsedNotes array
    parsedNotes.push(newNotes);

    //Writing the new note to the db.json file.
    fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(parsedNotes), (err, data) => {
      if (err) throw err;
      response.json(data)
      console.log("Note added!")
    })});
});

// Deleting the note from the db.json file.
app.delete("/notes/:id", (request, response) => {
  const id = request.params.id;
  // Reading the db.json file
  fs.readFile(path.join(__dirname, "../db/db.json"), (err, data) => {
    if (err) throw err;
    // Creating a variable to hold the parsed data from the db.json file
    const parseNotes = JSON.parse(data);
    // Takes any object in the array that does not match the id and returns it to the filterNotes array
    const filterNotes = parseNotes.filter(note => note.id !== id);

    // Writing the filteredNotes array to the db.json file
    fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(filterNotes), (err, data) => {
      if (err) throw err;
      response.json(data)
      console.log("Note deleted!")
    })
  })
});

module.exports = app;