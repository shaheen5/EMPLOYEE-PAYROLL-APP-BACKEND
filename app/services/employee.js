/**********************************************************************************************************
 *  Execution    : 1. Default node with npm   cmd> npm server.js
                   2. If nodemon installed    cmd> nodemon start
 *
 * Purpose      : services layer handles the actual business logic of our application
 *
 * @description  :modules need to be required before execution of this file  
 *
 * @file        : services/employee.js
 * @overview    : Performs tasks to interact with controller and model layer
 * @module      : calls functions from model layer which involves db operations & return response to controller  
 * @author      : Shaheen M.
 * @version     : 1.0
 * @since       : 15-06-2021
 **********************************************************************************************************/
const employeeModel = require('../models/employee');
const { logger } = require('../../config/logger');

class EmployeeOperationsService {

    /**
       * creates an employee object and send response to service layer
       * @param {*} req (express property)
       * @param {*} res (express property)
       * @returns callback
       */
    createEmployee = (empData, callback) => {
        try {
            employeeModel.addEmployee(empData, (error, data) => {
                if (error) {
                    logger.error('Some error occurred while creating employee', error);
                    return callback(error, null);
                } else {
                    logger.info('New Employee Details Added Successfully!');
                    return callback(null, data);
                }
            });
        } catch (error) {
            logger.error(error.message);
            return callback(error, null);
        }
    }

    /**
   * /retrieve and return all employees from the database.
   * @param {*} callback callback function
   */
    findAllEmployees = (callback) => {
        try {
            employeeModel.findAllEmployees((error, empData) => {
                if (error) {
                    logger.error('Some error occurred while retrieving employees', error);
                    return callback(error, null);
                } else {
                    logger.info('All Employee Records Retrieved Successfully!');
                    return callback(null, empData);
                }
            });
        } catch (error) {
            logger.error(error.message);
            return callback(error, null);
        }
    };

    /**
   * find a single employee with a employeeId
   * @param {*} employeeId path to the employee object
   * @param {*} callback callback function
   * @returns callback, object
   */
    findEmployee = (employeeId, callback) => {
        try {
            employeeModel.findEmployeeById(employeeId, (error, empData) => {
                if (error) {
                    logger.error('Some error occurred while retrieving employee', error);
                    return callback(error, null);
                } else {
                    logger.info('Employee Details Retrieved Successfully!');
                    return callback(null, empData);
                }
            });
        } catch (error) {
            logger.error(error.message);
            return callback(error, null);
        }
    }

    /**
     * Updating employee data
     * @param {*} employeeId id object
     * @param {*} empData data object
     * @param {*} callback function
     */
    updateEmployeeDetails = (employeeId, empData, callback) => {
        try {
            employeeModel.updateEmployeeById(employeeId, empData, (error, data) => {
                if (error) {
                    logger.error('Some error occurred while updating employee', error);
                    return callback(error, null);
                } else {
                    logger.info('Employee Details Updated Successfully!');
                    return callback(null, data);
                }
            });
        } catch (error) {
            logger.error(error.message);
            return callback(error, null);
        }
    };

    /**
   * deletes employee data with id
   * @param {*} employeeId path to the object
   * @param {*} callback callback function
   * @returns 
   */
    deleteEmployee = (employeeId, callback) => {
        try {
            employeeModel.removeEmployee(employeeId, (error, message) => {
                if (error) {
                    logger.error('Some error occurred while deleting employee',error);
                    return callback(error, "employee could not be deleted");
                } else {
                    logger.error(`Employee Details Deleted with id ${employeeId}`);
                    return callback(null, message);
                }
            });
        } catch (error) {
            logger.error(error.message);
            return callback(error, null);
        }
    }
}
module.exports = new EmployeeOperationsService();