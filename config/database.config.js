const mongoose = require('mongoose');
const { loggers } = require('winston');
require('dotenv').config();
const {logger} = require('./logger');

module.exports = () => {
    mongoose.Promise = global.Promise;

    // Connecting to the database
    mongoose.connect(process.env.URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        logger.info("Successfully Connected to the database!");
        console.log("Successfully connected to the database");
    }).catch(err => {
        logger.error('Problem connecting to database !');
        console.log('Could not connect to the database. Exiting now...', err);
        process.exit();
    });

    return mongoose.connection;
}