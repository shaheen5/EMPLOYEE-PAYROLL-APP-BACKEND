const Employee = require('../models/employee.model.js');

class EmployeeRegistrationService {

    //create and save a new employee

    createEmployee = (empData, callback) => {
        //create a employee
        const employee = new Employee({
            firstName: empData.firstName,
            lastName: empData.lastName,
            emailId: empData.emailId,
            password: empData.password
        });
        employee.save((error, empData) => {
            return (error) ? callback(error, null) : callback(null, empData);
        });
    }

    //retrieve and return all employees from the database.
    findAllEmployees = (callback) => {
        Employee.find({}, (error, empData) => {
            return callback(error, empData);
        });
    };
    //find a single employee with a employeeId
    findEmployee = (employeeId, callback) => {
        Employee.findById(employeeId, (error, empData) => {
            return (error) ? callback(error, null) : callback(null, empData);
        });
    }
    //update a employee identified by the employeeId in the request
    updateEmployeeDetails = (employeeId, empData, callback) => {
        //find employee by id and update it with the request body
        Employee.findByIdAndUpdate(employeeId, {
            firstName: empData.firstName,
            lastName: empData.lastName,
            emailId: empData.emailId,
            password: empData.password
        }, { new: true }, (error, Data) => {
            return (error) ? callback(error, null) : callback(null, Data);
        });
    };

    //delete a employee with the specified employeeId in the request
    deleteEmployee = (employeeId, callback) => {
        Employee.findByIdAndRemove(employeeId, (error, message) => {
            if (error) return callback(error, { "message": "Employee could not be deleted" });
            else return callback(null, { "message": "Employee was deleted successfully" });
        });
    }
}
module.exports = new EmployeeRegistrationService();