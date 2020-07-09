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

// Serve all files in the public folder
app.use(express.static('public'));

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

app.post("/api/notes", function(req, res) {

  // Read db.json from file and parse the JSON data
  fs.readFile("./db/db.json", (err, data) => {
      if (err)
          console.log(err);

      var parsed = JSON.parse(data);
      console.log(parsed);
      // This will get the last ID stored and add one for the next note
      var newId = parsed[parsed.length-1].id + 1;
      var newObj = {
        "id": newId,
        "title": req.body.title,
        "text": req.body.text
      }
      parsed.push(newObj);

      fs.writeFile("./db/db.json", JSON.stringify(parsed), (err) => {
        if (err)
          console.log(err);
    
        console.log(newObj, "successfully written to db.json!");
      })
  });

  app.delete("/api/notes/:id", function(req, res) {

    fs.readFile("./db/db.json", (err, data) => {
      if (err)
          console.log(err);

      var parsed = JSON.parse(data);

      // Find the object to delete
      var deletedObj = parsed.find( results => results.id === parseInt(req.params.id));

      // Find the position of said object
      var arrayPos = parsed.findIndex( obj => obj.id === deletedObj.id);

      // Now remove said object from the array
      parsed.splice(arrayPos, 1);

      // Finally, rewrite the new array as JSON
      fs.writeFile("./db/db.json", JSON.stringify(parsed), (err) => {
        if (err)
          console.log(err);
    
        console.log(deletedObj, "successfully deleted from db.json!");
      })
    })
  })
})

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
