const EmployeeService = require('../services/employee.service');
const EmployeeValidator = require('../middlewares/EmployeeValidation');

class EmployeeController {

    // Create and Save a new Note
    
    createNewEmployee = (req, res) => {
        let validationResult = EmployeeValidator.validate(req.body);
        if (validationResult.error){
            return res.status(400).send({
                status:'error',
                message: validationResult.error.details[0].message
            });
        }
        EmployeeService.createEmployee(req.body, (error, resultData) => {
            if (error) {
                return res.status(500).send({
                    message: error.message || "Some error occurred while creating the Note."
                });
            }
            res.send(resultData);
        });
    }
    // Retrieve and return all employees from the database.
    getAllEmployees = (req, res) => {
        EmployeeService.findAllEmployees((error, employees) => {
            if (error) {
                return res.status(500).send({
                    message: err.message || "Some error occurred while retrieving employees."
                });
            }
            if (!employees) {
                return res.status(404).send("There are no employees created yet!");
            }
            res.send(employees);
        });
    };
    // Find a single employee with a employeeId
    findEmployee = (req, res) => {
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
    updateEmployee = (req, res) => {
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
    deleteEmployee = (req, res) => {
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
module.exports = new EmployeeController();