const mongoose = require('mongoose');

mongoose.connect('mongodb://0.0.0.0:27017/milo_new_db');
const db = mongoose.connection;

db.on("error", console.error.bind('console','error'));

db.once('open' , () => {
    console.log("Connection established with milo_new_db");
})

module.exports = db;