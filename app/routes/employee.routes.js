module.exports = (app) => {
    const employee = require('../controllers/employee.controller.js');

    // Create a new Employee
    app.post('/employees', employee.create);

    // Retrieve all employee
    app.get('/employees', employee.findAll);

    // Retrieve a single Employee with employeeId
    app.get('/employees/:employeeId', employee.findOne);

    // Update an Employee with employeeId
    app.put('/employees/:employeeId', employee.update);

    // Delete an Employee with employeeId
    app.delete('/employees/:employeeId', employee.delete);
}