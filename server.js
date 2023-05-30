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
    let listString = ""
    dbNotes.forEach(oneNote => {
        listString+=
        `<li data-note="{'text':${oneNote.text}, 'title': ${oneNote.title}, 'id': ${oneNote.id}}" style="display:flex; justify-content: space-between;"><span onclick="handleNoteView()">${oneNote.title}</span><button class="deleteBtn" onclick="deleteNote('${oneNote.id}')">Delete</button></li>`
    })
    let htmlString = `
    <!DOCTYPE html>
    <html lang="en-US">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <title>Note Taker</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.3.1/css/all.css"
          integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU"
          crossorigin="anonymous"
        />
        <link rel="stylesheet" href="/assets/css/styles.css" />
      </head>
    
      <body>
        <nav class="navbar bg-info">
          <a class="navbar-brand text-light p-3" href="/">Note Taker </a>
          <div class="icons">
            <i class="fas fa-save text-light save-note" onclick="saveNote()"></i>
            <i class="fas fa-plus text-light new-note"></i>
          </div>
        </nav>
        <div class="container-fluid">
          <div class="row">
            <div class="col-4 list-container">
              <div class="card">
                <ul class="list-group">
                  ${listString}
                </ul>
              </div>
            </div>
            <div class="col-8">
              <input
                onkeyup="checkText()"
                id="titleField"
                name="noteTitle"
                class="note-title"
                placeholder="Note Title"
                maxlength="28"
                type="text"
               
              />
              <textarea onkeyup="checkText()" id="textField" name="noteText" class="note-textarea" placeholder="Note Text"></textarea>
            </div>
          </div>
        </div>
        <script src="./assets/js/index.js"></script>
      </body>
    </html>`
    

res.send(htmlString)
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

app.post("/notes", (req, res) =>{
    let dbNotes = JSON.parse(fs.readFileSync("./db/db.json"))
    let newNote = req.body
    newNote.id = id.v1()
    dbNotes.push(newNote)
    fs.writeFileSync("db/db.json", JSON.stringify(dbNotes))
    let dbFile = JSON.parse(fs.readFileSync("./db/db.json"))
    // res.render("notes", {noteList:dbFile})
})
