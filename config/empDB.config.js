const mongoose = require('mongoose');
require('dotenv').config();

module.exports = () => {
    mongoose.Promise = global.Promise;

    // Connecting to the database
    mongoose.connect(process.env.EMPLOYEE_DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("Successfully connected to the employee database");
    }).catch(err => {
        console.log('Could not connect to the database. Exiting now...', err);
        process.exit();
    });

    return mongoose.connection;
}