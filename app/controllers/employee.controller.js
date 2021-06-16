const EmployeeService = require('../services/employee.service');

class Controller {

    // Create and Save a new Note
    create = (req, res) => {
        EmployeeService.createEmployee(req.body, (error, resultData) => {
            if (error) {
                res.status(500).send({
                    message: error.message || "Some error occurred while creating the Note."
                });
            }
            res.send(resultData);
        });
    }
    // Retrieve and return all employees from the database.
    findAll = (req, res) => {
        EmployeeService.findAllEmployees((error, employees) => {
            if (!employees) {
                res.status(404).send("There are no employees created yet!");
            }
            if (error) {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving employees."
                });
            }
            res.send(employees);
        });
    };
    // Find a single employee with a employeeId
    findOne = (req, res) => {
        EmployeeService.findEmployee(req.params.employeeId, (error, resultData) => {
            if (error) {
                if (error.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "Employee not found with id " + req.params.employeeId
                    });
                }
                return res.status(500).send({
                    message: "Error retrieving employee with id " + req.params.employeeId
                });
            }
            res.send(resultData);
        });
    };

    // Update a employee identified by the employeeId in the request
    update = (req, res) => {
        EmployeeService.updateEmployeeDetails(req.params.employeeId, req.body, (error, resultData) => {
            if (error) {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "Employee not found with id " + req.params.employeeId
                    });
                }
                return res.status(500).send({
                    message: "Error updating employee with id " + req.params.employeeId
                });
            }
            res.send(resultData);
        });
    };
    // Delete a employee with the specified employeeId in the request
    delete = (req, res) => {
        EmployeeService.deleteEmployee(req.params.employeeId, (error, message) => {
            if (error) {
                return res.status(500).send({
                    message: "Error deleting employee with id " + req.params.employeeId
                });
            }
            res.send(message);
        });
    };
}
module.exports = new Controller();