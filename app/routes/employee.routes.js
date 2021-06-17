module.exports = (app) => {
    const employee = require('../controllers/employee.controller.js');

    // Create a new Employee
    app.post('/employees', employee.createNewEmployee);

    // Retrieve all employee
    app.get('/employees', employee.getAllEmployees);

    // Retrieve a single Employee with employeeId
    app.get('/employees/:employeeId', employee.findEmployee);

    // Update an Employee with employeeId
    app.put('/employees/:employeeId', employee.updateEmployee);

    // Delete an Employee with employeeId
    app.delete('/employees/:employeeId', employee.deleteEmployee);
}