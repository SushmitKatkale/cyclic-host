const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/app');
const db = mongoose.connection;

db.on("error", console.error.bind('console','error'));

db.once('open' , () => {
    console.log("Connection established with app");
})

module.exports = db;
