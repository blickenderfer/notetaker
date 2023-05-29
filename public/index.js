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