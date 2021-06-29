/**********************************************************************************************************
 *  Execution    : 1. Default node with npm   cmd> npm server.js
                   2. If nodemon installed    cmd> nodemon start
 *
 * Purpose      : define end points for our application 
 *
 * @description  :modules need to be required before execution of this file  
 *
 * @file        : routes/routes.js
 * @overview    : defines routes for login,registration and employee crud operation web pages
 * @module      :  use HTTP methods to send request to server 
 * @author      : Shaheen M.
 * @version     : 1.0
 * @since       : 15-06-2021
 **********************************************************************************************************/
module.exports = (app) => {
    const employee = require('../controllers/employee');
    const user = require('../controllers/users');
    const helper = require('../middlewares/helper');
    // Create a new user
    app.post('/registerUser', user.registerUser);

    // login user
    app.post('/login', user.userLogin);

    // Create a new Employee
    app.post('/employees', helper.authenticateToken, employee.createNewEmployee);

    // Retrieve all employee
    app.get('/getEmployees', helper.authenticateToken, employee.getAllEmployees);

    // Retrieve a single Employee with employeeId
    app.get('/getEmployee/:employeeId', helper.authenticateToken, employee.findEmployee);

    // Update an Employee with employeeId
    app.put('/updateEmployee/:employeeId', helper.authenticateToken, employee.updateEmployee);

    // Delete an Employee with employeeId
    app.delete('/deleteEmployee/:employeeId', helper.authenticateToken, employee.deleteEmployee);
}