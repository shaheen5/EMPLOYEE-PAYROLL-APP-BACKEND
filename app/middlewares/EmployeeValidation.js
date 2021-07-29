/**********************************************************************************************************
 *  Execution    : 1. Default node with npm   cmd> npm server.js
                   2. If nodemon installed    cmd> nodemon start
 *
 * Purpose      : user input request validation for employee operations 
 *
 * @description  :joi package need to be installed & required before execution of this file 
 *
 * @file        : middlewares/EmployeeValidation.js
 * @overview    : validates the employee data send as request to server 
 * @module      : validates input request against pre-defined object schema since users can send anything 
 * @author      : Shaheen M.
 * @version     : 1.0
 * @since       : 15-06-2021
 **********************************************************************************************************/
const Joi = require('joi');

const employeeObjectSchema = Joi.object({
    firstName: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    lastName: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    gender:Joi.string()
        .alphanum()
        .max(6)
        .required(),
    salary:Joi.number()
        .integer()
        .required(),
    department:Joi.string()
        .alphanum()
        .min(2)
        .max(20)
        .required(),
    emailId: Joi.string()
        .email()
        .required()
});
module.exports = employeeObjectSchema;