/**********************************************************************************************************
 *  Execution    : 1. Default node with npm   cmd> npm server.js
                   2. If nodemon installed    cmd> nodemon start
 *
 * Purpose      : define employee schema for database , use mongoose methods to perform db operations 
 *
 * @description  :modules need to be required before execution of this file  
 *
 * @file        : models/employee.model.js
 * @overview    : Provides schema for database and performs mongoose CRUD operations
 * @module      : neccessary to define employee schema for database ,define functions accessed by services layer  
 * @author      : Shaheen M.
 * @version     : 1.0
 * @since       : 15-06-2021
 **********************************************************************************************************/
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
        validate: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/
    }
}, {
    timestamps: true
});

EmployeeSchema.pre("save", function (next) {
    const employee = this;

    bcrypt.hash(this.password, 10, (err, hashedPassword) => {
        if (err) {
            return next(err);
        }
        employee.password = hashedPassword;
        next();
    });
});

const Employee = mongoose.model('Employee', EmployeeSchema);

class UserOperations {
    addEmployee = (empData, callback) => {
        /**
            * @description addEmployee method is to save the new Employee Data
            * @param empData is data sent from Services layer
            * @return callback is used to callback Services includes error message or data
            */
        const employee = new Employee({
            firstName: empData.firstName,
            lastName: empData.lastName,
            emailId: empData.emailId,
            password: empData.password
        });
        employee.save({}, (error, empData) => {
            return (error) ? callback(error, null) : callback(null, empData);
        });
    }
    /**
        * @description retrive all the Employee Data from database
        * @param callback is data sent from Serviceslayer
        * @return callback is used to callback Services with data or error message
        */
    findAllEmployees = (callback) => {
        Employee.find((error, empData) => {
            return callback(error, empData);
        });
    }
    /**
        * @description retrive the Employee Data from MongoDB
        * @param employeeId, callback is data sent from Services layer
        * @return callback is used to callback Services with data or error message
        */
    findEmployeeById = (employeeId, callback) => {
        Employee.findById(employeeId, (error, empData) => {
            return (error) ? callback(error, null) : callback(null, empData);
        });
    }
    /**
       * @description Update the employee Data by Id
       * @param employeeId, empData and callback
       * @return callback is used to callback Services with data or error message
       */
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
    /**
        * @description delete the Employee Data from database
        * @param objectId, callback is data sent from services layer
        * @return callback is used to callback Services with or without error message
        */
    removeEmployee = (employeeId, callback) => {
        Employee.findByIdAndRemove(employeeId, (error, message) => {
            if (error) return callback(error, { "message": error.message });
            else return callback(null, { "message": "Employee was deleted successfully" });
        });
    }
}
module.exports = new UserOperations();