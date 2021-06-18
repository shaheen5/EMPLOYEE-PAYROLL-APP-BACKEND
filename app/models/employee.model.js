const mongoose = require('mongoose');

const EmployeeSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        validate: /^[a-zA-Z]{3,20}$/
    },
    lastName: {
        type: String,
        required: true,
        validate: /^[a-zA-Z]{3,20}$/
    },
    emailId: {
        type: String,
        required: true,
        validate: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9]+[.]+[a-zA-Z]+$/,
        unique: true
    },
    password: {
        type: String,
        required: true,
        validate: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})$/
    }
}, {
    timestamps: true
});

const Employee = mongoose.model('Employee', EmployeeSchema);

class EmployeeRegistration {
    addEmployee = (empData, callback) => {
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

    findAllEmployees = (callback) => {
        Employee.find((error, empData) => {
            return callback(error, empData);
        });
    }

    findEmployeeById = (employeeId, callback) => {
        Employee.findById(employeeId, (error, empData) => {
            return (error) ? callback(error, null) : callback(null, empData);
        });
    }

    updateEmployeeById = (employeeId, empData, callback) => {
        //find employee by id and update it with the request body
        Employee.findByIdAndUpdate(employeeId, {
            firstName: empData.firstName,
            lastName: empData.lastName,
            emailId: empData.emailId,
            password: empData.password
        }, { new: true }, (error, Data) => {
            return (error) ? callback(error, null) : callback(null, Data);
        });
    }

    removeEmployee = (employeeId, callback) => {
        Employee.findByIdAndRemove(employeeId, (error, message) => {
            if (error) return callback(error, { "message": error.message });
            else return callback(null, { "message": "Employee was deleted successfully" });
        });
    }
}
module.exports = new EmployeeRegistration();