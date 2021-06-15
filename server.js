const express = require('express');

//create express app
const app = express();

//parse requests of content-type application/x-www-form-urlencoded
app.use(express.urlencoded({extended:true}))

// parse requests of content-type - application/json
app.use(express.json());

// Configuring the database
const dbConnect = require('./config/database.config');
dbConnect();

//define a simple route
app.get('/',(req,res)=>{
    res.json({"message" : "Welcome To Employee Payroll Application"});
});

app.listen(8000,()=>{
    console.log("Server is listening at port number 8000");
})