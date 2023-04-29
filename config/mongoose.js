const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/milo_new_db');
const db = mongoose.connection;

db.on("error", console.error.bind('console','error'));

db.once('open' , () => {
    console.log("Connection established with milo_new_db");
})

module.exports = db;