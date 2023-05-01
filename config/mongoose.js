const mongoose = require('mongoose');

mongoose.connect('mongosh "mongodb+srv://cluster0.layc9jh.mongodb.net/myFirstDatabase" --apiVersion 1 --username katkalesushmit');
const db = mongoose.connection;

db.on("error", console.error.bind('console','error'));

db.once('open' , () => {
    console.log("Connection established with milo_new_db");
})

module.exports = db;