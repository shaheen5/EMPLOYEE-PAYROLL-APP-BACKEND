const mongoose = require('mongoose');
require('dotenv').config();

module.exports = ()=> {
    mongoose.Promise = global.Promise;

    const url = process.env.URL;

    // Connecting to the database
    mongoose.connect(url, {
        useNewUrlParser: true
    }).then(() => {
        console.log("Successfully connected to the database");
    }).catch(err => {
        console.log('Could not connect to the database. Exiting now...', err);
        process.exit();
    });

    return mongoose.connection;
}