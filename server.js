// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var fs = require('fs');


// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Read db.json from file and store to variable
// =============================================================
var file = fs.readFile("./db/db.json", (err, data) => {
    if (err)
        console.log(err);

    var parsed = JSON.parse(data);
    console.log(parsed);
});

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
