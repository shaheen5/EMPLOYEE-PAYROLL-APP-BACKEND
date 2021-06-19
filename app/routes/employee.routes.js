module.exports = (app) => {
    const employee = require('../controllers/employee.controller.js');

    // Create a new Employee
    app.post('/employees', employee.createNewEmployee);

    // Retrieve all employee
    app.get('/getEmployees', employee.getAllEmployees);

    // Retrieve a single Employee with employeeId
    app.get('/getEmployee/:employeeId', employee.findEmployee);

    // Update an Employee with employeeId
    app.put('/updateEmployee/:employeeId', employee.updateEmployee);

    // Delete an Employee with employeeId
    app.delete('/deleteEmployee/:employeeId', employee.deleteEmployee);
}