/**********************************************************************************************************
 *  Execution    : 1. Default node with npm   cmd> npm server.js
                   2. If nodemon installed    cmd> nodemon start
 *
 * Purpose      : controller handles request and responses of employee CRUD API
 *
 * @description  :modules need to be required before execution of this file 
 *
 * @file        : controller/employee.controller.js
 * @overview    : Handles requests coming from clients
 * @module      : neccessary part (controller) of MVC Model of employee Payroll API
 * @author      : Shaheen M.
 * @version     : 1.0
 * @since       : 15-06-2021
 **********************************************************************************************************/

const EmployeeService = require('../services/employee.service');
const EmployeeValidator = require('../middlewares/EmployeeValidation');

class EmployeeController {

    /**
  * function to validate re body received from client and call service createEmployee function
  * @param {*} req (express property)
  * @param {*} res (express property)
  * @returns HTTP status and object
  */

    createNewEmployee = (req, res) => {
        try {
            let validationResult = EmployeeValidator.validate(req.body);
            if (validationResult.error) {
                return res.status(400).send({
                    status: 'error',
                    message: validationResult.error.details[0].message
                });
            }
            EmployeeService.createEmployee(req.body, (error, resultData) => {
                if (error) {
                    return res.status(500).send({
                        message: error.message || "Some error occurred while creating Employee."
                    });
                }
                res.send(resultData);
            });
        } catch (error) {
            return res.send({ message: error.message });
        }
    }

    /**
   * function to call the findAllEmployees function of service layer which retrives data from db
   * @param {*} req (express property)
   * @param {*} res (express property)
   * @returns HTTP status and object
   */
    getAllEmployees = (req, res) => {
        try {
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
        } catch (error) {
            return res.send({ message: error.message });
        }
    };

    /**
   * function to call the findEmployee function of service that gets the required employee data from db
   * @param {*} req (express property)
   * @param {*} res (express property)
   * @returns HTTP status and employee object
   */
    findEmployee = (req, res) => {
        try {
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
        } catch (error) {
            return res.send({ message: error.message });
        }
    };

    /**
   * function to call the update function that updates the required employee data from db
   * @param {*} req (express property)
   * @param {*} res (express property)
   * @returns HTTP status and object
   */
    updateEmployee = (req, res) => {
        try {
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

        } catch (error) {
            return res.send({ message: error.message });
        }
    };

    /**
       * function to call the deleteEmployee function of service layer that deletes
       *  the required employee data from the db 
       * @param {*} req (express property)
       * @param {*} res (express property)
       * @returns HTTP status and object
       */
    deleteEmployee = (req, res) => {
        try {
            EmployeeService.deleteEmployee(req.params.employeeId, (error, message) => {
                if (error) {
                    return res.status(500).send({
                        message: "Error deleting employee with id " + req.params.employeeId
                    });
                }
                res.send(message);
            });
        } catch (error) {
            return res.send({ message: error.message });
        }
    };
}
module.exports = new EmployeeController();