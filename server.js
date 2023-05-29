const express = require("express");
const db = require("./db/db.json"); 
const id = require("uuid"); 
const fs = require("fs"); 
const app = express();
const port = 4002

app.listen(port);
console.log("Connected to port " + port);

app.use(express.urlencoded({
    extended: true
}))

app.use(express.json());
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res)=>{
    res.sendFile("index.html")
})

app.get("/notes", (req, res)=>{
    let dbNotes = JSON.parse(fs.readFileSync("./db/db.json"))
    res.render("notes", {
        noteList: dbNotes
    })
})

app.get("/notes/:id", (req, res) =>{
    let dbNotes = JSON.parse(fs.readFileSync("./db/db.json"))
    for(let i=0; i<dbNotes.length; i++){
        if(dbNotes[i].id === req.params.id){
            res.render("notes", {
                title: dbNotes[i].title,
                text: dbNotes[i].text,
                noteList: dbNotes
            })
        }
    }
})
