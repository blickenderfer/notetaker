const express = require("express");
const db = require("./db/db.json"); 
const id = require("uuid"); 
const fs = require("fs"); 
const path = require("path");
const app = express();
const PORT = process.env.PORT || 4002

//this means the URL accepts encoded characters
app.use(express.urlencoded({
    extended: true
}))

//this allows us to pass JSON objects back and forth between the front end and back end
app.use(express.json());
app.use(express.static("public"));
//this delivers the index.html for the home page
app.get("/", (req, res)=>{
    res.sendFile(path.join(__dirname, "/public/index.html"))
})
//this delivers the html for the notes page
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"))
})
//this is an api route for the note objects
app.get("/api/notes", (req, res)=>{
    let dbNotes = JSON.parse(fs.readFileSync("./db/db.json"))
    console.log(dbNotes);
//this get and sends the notes
res.json(dbNotes)
})

//this is an api route that adds a new route to the db.json
app.post("/api/notes", (req, res) =>{
    let dbNotes = JSON.parse(fs.readFileSync("./db/db.json"))
    let newNote = req.body
    console.log(newNote);
    newNote.id = id.v1()
    dbNotes.push(newNote)
    fs.writeFileSync("db/db.json", JSON.stringify(dbNotes))
    let dbFile = JSON.parse(fs.readFileSync("./db/db.json"))
    res.json(dbNotes)   
})
//this removes a note from db.json
app.delete("/api/notes/:id", (req, res)=>{
  console.log(req.params.id)
  let dbNotes = JSON.parse(fs.readFileSync("./db/db.json"))
  let filteredNotes = dbNotes.filter(note => note.id !== req.params.id)
  console.log(filteredNotes)
  fs.writeFileSync("db/db.json", JSON.stringify(filteredNotes))
  res.json(filteredNotes)
})

//this makes sure the server is running
app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});