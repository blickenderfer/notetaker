const express = require("express");
const db = require("./db/db.json"); 
const id = require("uuid"); 
const fs = require("fs"); 
const app = express();
const port = 3001

app.listen(port);
console.log("Connected to port " + port);

app.use(express.urlencoded({
    extended: true
}))