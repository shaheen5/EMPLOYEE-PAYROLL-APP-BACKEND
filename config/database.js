/**********************************************************************************************************
 *  Execution    : 1. Default node with npm   cmd> npm server.js
                   2. If nodemon installed    cmd> nodemon start
 *
 * Purpose      : database connection 
 *
 * @description  :mongoose,winston,dotenv package need to be installed & required before execution of this file 
 *
 * @file        : config/database.js
 * @overview    : It uses mongoose to connect to mongo db database  and returns a connection handler
 * @module      :  connects to db,logs appropriate message to log files 
 * @author      : Shaheen M.
 * @version     : 1.0
 * @since       : 15-06-2021
 **********************************************************************************************************/
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