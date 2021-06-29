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

const EmployeeService = require('../services/employee.js');
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
            //check whether request body input length is 4 
            if ( Object.keys(req.body).length != 4) {
                return res.status(400).send({ success: false, message: "Invalid Input!" });
            }
            let validationResult = EmployeeValidator.validate(req.body);
            if (validationResult.error) {
                return res.status(400).send({
                    success: false,
                    message: validationResult.error.details[0].message
                });
            }
            EmployeeService.createEmployee(req.body, (error, resultData) => {
                if (error) {
                    return res.status(500).send({
                        success: false,
                        message: error.message || "Some error occurred while creating Employee."
                    });
                }
                res.status(201).send({
                    success: true,
                    data: resultData,
                    message: "Employee Added Succesfully!"
                });
            });
        } catch (error) {
            return res.status(500).send({
                success: false,
                message: error.message
            });
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
                        success: false,
                        message: err.message || "Some error occurred while retrieving employees."
                    });
                }
                if (!employees) {
                    return res.status(404).send("There are no employees created yet!");
                }
                res.status(200).send({
                    success: true,
                    data: employees,
                    message: "Successfully Retrieved All Employees !"
                });
            });
        } catch (error) {
            return res.status(500).send({
                success: false,
                message: error.message
            });
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
                            success: false,
                            message: "Employee not found with id " + req.params.employeeId
                        });
                    }
                    return res.status(500).send({
                        success: false,
                        message: "Error retrieving employee with id " + req.params.employeeId
                    });
                }
                if (resultData) {
                    res.status(200).send({
                        success: true,
                        data: resultData,
                        message: "Found Employee Details successfully!"
                    });
                }else{
                    res.send(404).send({
                        succes:false,
                        message:"Data is not available for given id"
                    });
                }

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
             //check whether request body contains only 4 input properties
             if (Object.keys(req.body).length != 4) {
                return res.status(400).send({ success: false, message: "Invalid Input!" });
            }
            EmployeeService.updateEmployeeDetails(req.params.employeeId, req.body, (error, resultData) => {
                if (error) {
                    if (error.kind === 'ObjectId') {
                        return res.status(404).send({
                            message: "Employee not found with id " + req.params.employeeId
                        });
                    }
                    return res.status(500).send({
                        message: "Error updating employee with id " + req.params.employeeId
                    });
                }
                res.send({
                    success: true,
                    message: "Employee Details Updated Successfully!",
                    data: resultData
                });
            });

        } catch (error) {
            return res.send({
                success: false,
                message: error.message
            });
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
                        success: false,
                        message: "Error deleting employee with id "
                    });
                }
                res.status(200).send({
                    success: true,
                    message: message
                });
            });
        } catch (error) {
            return res.send({
                message: error.message
            });
        }
    };
}
module.exports = new EmployeeController();