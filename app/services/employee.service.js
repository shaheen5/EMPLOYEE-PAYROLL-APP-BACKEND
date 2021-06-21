/**********************************************************************************************************
 *  Execution    : 1. Default node with npm   cmd> npm server.js
                   2. If nodemon installed    cmd> nodemon start
 *
 * Purpose      : services layer handles the actual business logic of our application
 *
 * @description  :modules need to be required before execution of this file  
 *
 * @file        : services/employee.service.js
 * @overview    : Performs tasks to interact with controller and model layer
 * @module      : calls functions from model layer which involves db operations & return response to controller  
 * @author      : Shaheen M.
 * @version     : 1.0
 * @since       : 15-06-2021
 **********************************************************************************************************/
const Employee = require('../models/employee.model.js');

class EmployeeOperationsService {

    /**
       * creates an employee object and send response to service layer
       * @param {*} req (express property)
       * @param {*} res (express property)
       * @returns callback
       */
    createEmployee = (empData, callback) => {
        Employee.addEmployee(empData, (error, data) => {
            return (error) ? callback(error, null) : callback(null, data);
        });
    }

    /**
   * /retrieve and return all employees from the database.
   * @param {*} callback callback function
   */
    findAllEmployees = (callback) => {
        Employee.findAllEmployees((error, empData) => {
            return callback(error, empData);
        });
    };

    /**
   * find a single employee with a employeeId
   * @param {*} employeeId path to the employee object
   * @param {*} callback callback function
   * @returns callback, object
   */
    findEmployee = (employeeId, callback) => {
        Employee.findEmployeeById(employeeId, (error, empData) => {
            return (error) ? callback(error, null) : callback(null, empData);
        });
    }

    /**
     * Updating employee data
     * @param {*} employeeId id object
     * @param {*} empData data object
     * @param {*} callback function
     */
    updateEmployeeDetails = (employeeId, empData, callback) => {
        Employee.updateEmployeeById(employeeId, empData, (error, data) => {
            return (error) ? callback(error, null) : callback(null, data);
        })
    };

    /**
   * deletes employee data with id
   * @param {*} employeeId path to the object
   * @param {*} callback callback function
   * @returns 
   */
    deleteEmployee = (employeeId, callback) => {
        Employee.removeEmployee(employeeId, (error, message) => {
            if (error) return callback(error, { "message": "Employee could not be deleted" });
            else return callback(null, { "message": "Employee was deleted successfully" });
        });
    }
}
module.exports = new EmployeeOperationsService();