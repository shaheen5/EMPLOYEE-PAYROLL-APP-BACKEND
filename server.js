/**********************************************************************************************************
 *  Execution    : 1. Default node with npm   cmd> npm server.js
                   2. If nodemon installed    cmd> nodemon start
 *
 * Purpose      : entry point for the program where express app is created
 *
 * @description  :Dependencies require to be installed before execution of this file 
 *
 * @file        : server.js
 * @overview    : Create web application using express,Set up the server,connect to database,define routes
 * @module      : starting point to run the employee Payroll API
 * @author      : Shaheen M.
 * @version     : 1.0
 * @since       : 15-06-2021
 **********************************************************************************************************/

const express = require('express');
require('dotenv').config();

//create express app
const app = express();

const swaggerUi = require('swagger-ui-express');

const swaggerDocument = require('./swagger/swagger.json');

//parse requests of content-type application/x-www-form-urlencoded
app.use(express.urlencoded({extended:true}))

// parse requests of content-type - application/json
app.use(express.json());

//using swagger UI 
app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerDocument));

// Configuring the database
const dbConnect = require('./config/database.config');
dbConnect();

// Require routes
require('./app/routes/employee.routes.js')(app);

//define a simple route
app.get('/',(req,res)=>{
    res.json({"message" : "Welcome To Employee Payroll Application"});
});

app.listen(process.env.PORT,()=>{
    console.log(`Server is listening at port ${process.env.PORT}`);
});

module.exports = app; // for testing