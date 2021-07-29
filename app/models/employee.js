/**********************************************************************************************************
 *  Execution    : 1. Default node with npm   cmd> npm server.js
                   2. If nodemon installed    cmd> nodemon start
 *
 * Purpose      : define employee schema for database , use mongoose methods to perform db operations 
 *
 * @description  :modules need to be required before execution of this file  
 *
 * @file        : models/employee.js
 * @overview    : Provides schema for database and performs mongoose CRUD operations
 * @module      : neccessary to define employee schema for database ,define functions accessed by services layer  
 * @author      : Shaheen M.
 * @version     : 1.0
 * @since       : 15-06-2021
 **********************************************************************************************************/
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const employeeSchema = mongoose.Schema({
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
    gender:{
        type:String,
        required:true,
        validate:/^[a-zA-Z]/
    },
    salary:{
        type:String,
        required:true,
        validate: /^[0-9]/
    },
    department:{
        type:String,
        required:true,
        validate: /^[a-zA-Z]{2,20}$/
    },
    emailId: {
        type: String,
        required: true,
        validate: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9]+[.]+[a-zA-Z]+$/,
        unique: true
    }
}, {
    timestamps: true
});

const Employee = mongoose.model('Employee', employeeSchema);

class UserOperations {
    /**
        * @description addEmployee method is to save the new Employee Data
        * @param empData is data sent from Services layer
        * @return callback is used to callback Services includes error message or data
            */
    addEmployee = (empData, callback) => {
        try {
            const employee = new Employee({
                firstName: empData.firstName,
                lastName: empData.lastName,
                gender:empData.gender,
                salary:empData.salary,
                department:empData.department,
                emailId: empData.emailId
            });
            employee.save({}, (error, empData) => {
                return (error) ? callback(error, null) : callback(null, empData);
            });
        } catch (error) {
            return callback(error, null);
        }
    }
    /**
        * @description retrive all the Employee Data from database
        * @param callback is data sent from Serviceslayer
        * @return callback is used to callback Services with data or error message
        */
    findAllEmployees = (callback) => {
        try {
            Employee.find((error, empData) => {
                return (error) ? callback(error, null) : callback(null, empData);
            });
        } catch (error) {
            return callback(error, null);
        }
    }
    /**
        * @description retrive the Employee Data from MongoDB
        * @param employeeId, callback is data sent from Services layer
        * @return callback is used to callback Services with data or error message
        */
    findEmployeeById = (employeeId, callback) => {
        try {
            Employee.findById(employeeId, (error, empData) => {
                return (error) ? callback(error, null) : callback(null, empData);
            });
        } catch (error) {
            return callback(error, null);
        }
    }
    /**
       * @description Update the employee Data by Id
       * @param employeeId, empData and callback
       * @return callback is used to callback Services with data or error message
       */
    updateEmployeeById = (employeeId, empData, callback) => {
        try {
            //find employee by id and update it with the request body
            Employee.findByIdAndUpdate(employeeId, {
                firstName: empData.firstName,
                lastName: empData.lastName,
                gender:empData.gender,
                salary:empData.salary,
                department:empData.department,
                emailId: empData.emailId
            }, { new: true }, (error, Data) => {
                return (error) ? callback(error, null) : callback(null, Data);
            });
        } catch (error) {
            return callback(error, null);
        }
    }
    /**
        * @description delete the Employee Data from database
        * @param objectId, callback is data sent from services layer
        * @return callback is used to callback Services with or without error message
        */
    removeEmployee = (employeeId, callback) => {
        try {
            Employee.findByIdAndRemove(employeeId, (error, message) => {
                if (error) return callback(error, { "message": error.message });
                else return callback(null,"Employee was deleted successfully");
            });
        } catch (error) {
            return callback(error, "Some error occurred!");
        }
    }
}
module.exports = new UserOperations();