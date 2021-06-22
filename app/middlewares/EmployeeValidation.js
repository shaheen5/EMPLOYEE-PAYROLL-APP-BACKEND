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

const EmployeeObjectSchema = Joi.object({
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
    emailId: Joi.string()
        .email()
        .required(),
    password: Joi.string()
        .pattern(new RegExp("^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$"))
        .required()
});
module.exports = EmployeeObjectSchema;