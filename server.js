const express = require("express");
const db = require("./db/db.json"); 
const id = require("uuid"); 
const fs = require("fs"); 
const path = require("path");
const app = express();
const PORT = process.env.PORT || 4002


app.use(express.urlencoded({
    extended: true
}))

app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res)=>{
    res.sendFile(path.join(__dirname, "/public/index.html"))
})

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"))
})

app.get("/api/notes", (req, res)=>{
    let dbNotes = JSON.parse(fs.readFileSync("./db/db.json"))
    console.log(dbNotes);

res.json(dbNotes)
})
// app.get("/notes/:id", (req, res) =>{
//     let dbNotes = JSON.parse(fs.readFileSync("./db/db.json"))
//     for(let i=0; i<dbNotes.length; i++){
//         if(dbNotes[i].id === req.params.id){
//             res.render("notes", {
//                 title: dbNotes[i].title,
//                 text: dbNotes[i].text,
//                 noteList: dbNotes
//             })
//         }
//     }
// })

app.post("/api/notes", (req, res) =>{
    let dbNotes = JSON.parse(fs.readFileSync("./db/db.json"))
    let newNote = req.body
    console.log(newNote);
    newNote.id = id.v1()
    dbNotes.push(newNote)
    fs.writeFileSync("db/db.json", JSON.stringify(dbNotes))
    let dbFile = JSON.parse(fs.readFileSync("./db/db.json"))
    // res.render("notes", {noteList:dbFile})
})

app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});