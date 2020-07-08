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

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("/api/notes", function(req, res) {

    // Read db.json from file and parse the JSON data
    fs.readFile("./db/db.json", (err, data) => {
        if (err)
            console.log(err);
    
        var parsed = JSON.parse(data);
        console.log(parsed);
        res.json(parsed);
    });
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
