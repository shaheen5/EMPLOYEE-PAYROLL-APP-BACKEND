const Employee = require('../models/employee.model.js');

class EmployeeRegistrationService {

    //create and save a new employee

    createEmployee = (empData, callback) => {
        Employee.addEmployee(empData,(error,data)=>{
            return (error) ? callback(error, null) : callback(null, data);
        });
    }

    //retrieve and return all employees from the database.
    findAllEmployees = (callback) => {
        Employee.findAllEmployees((error, empData) => {
            return callback(error, empData);
        });
    };
    //find a single employee with a employeeId
    findEmployee = (employeeId, callback) => {
        Employee.findEmployeeById(employeeId, (error, empData) => {
            return (error) ? callback(error, null) : callback(null, empData);
        });
    }
    //update a employee identified by the employeeId in the request
    updateEmployeeDetails = (employeeId, empData, callback) => {
        Employee.updateEmployeeById(employeeId,empData,(error,data)=>{
            return (error) ? callback(error, null) : callback(null, data);
        })
    };

    //delete a employee with the specified employeeId in the request
    deleteEmployee = (employeeId, callback) => {
        Employee.removeEmployee(employeeId, (error, message) => {
            if (error) return callback(error, { "message": "Employee could not be deleted" });
            else return callback(null, { "message": "Employee was deleted successfully" });
        });
    }
}
module.exports = new EmployeeRegistrationService();