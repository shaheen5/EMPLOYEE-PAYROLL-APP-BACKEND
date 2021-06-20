const express = require('express');
require('dotenv').config();
//create express app
const app = express();

//parse requests of content-type application/x-www-form-urlencoded
app.use(express.urlencoded({extended:true}))

// parse requests of content-type - application/json
app.use(express.json());

// Configuring the database
const dbConnect = require('./config/empDB.config');
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