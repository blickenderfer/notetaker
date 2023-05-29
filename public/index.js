function getNote(id){
    console.log(id)
    fetch(`/notes/${id}`)
    .then(res => res.text())
    .then(data => {
        document.documentElement.innerHTML = data
        document.getElementById("titleField").setAttribute("readonly", true)
        document.getElementById("textField").setAttribute("readonly", true)
    })
}

function deleteNote(){
    console.log("connected")
}

function saveNote(){
    let noteTitle = document.getElementById("titleField").value
    let noteText = document.getElementById("textField").value
    let noteObject = {title:noteTitle, text:noteText}
    fetch("/notes", {
        method: "POST", 
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(noteObject)
    })
}