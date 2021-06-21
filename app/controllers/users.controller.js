/**********************************************************************************************************
 *  Execution    : 1. Default node with npm   cmd> npm server.js
                   2. If nodemon installed    cmd> nodemon start
 *
 * Purpose      : controller handles request and responses of  user login & registartion
 *
 * @description  :modules need to be required before execution of this file 
 *
 * @file        : controller/users.controller.js
 * @overview    : Handles requests coming from clients to login & register 
 * @module      : neccessary part (controller) of MVC Model of employee Payroll API
 * @author      : Shaheen M.
 * @version     : 1.0
 * @since       : 15-06-2021
 **********************************************************************************************************/
const userService = require('../services/user.service');
const UserValidator = require('../middlewares/UserValidation');

class UserController {
    /**
        * function to validate req body and call service layer function registerUser to add new user in db
        * @param {*} req (express property)
        * @param {*} res (express property)
        * @returns HTTP status and object
        */
    registerUser = (req, res) => {
        let validationResult = UserValidator.validate(req.body);
        if (validationResult.error) {
            return res.status(400).send({
                status: 'error',
                message: validationResult.error.details[0].message
            });
        }

        userService.registerUser(req.body, (err, userData) => {
            if (err) {
                return res.status(500).send({
                    message: err.message || "Some error occurred while registering user."
                });
            }
            res.send(userData);
        });
    }

    /**
        * To login user  and authenticate
        * @param {*} req (express property)
        * @param {*} res (express property)
        */
    userLogin = (req, res) => {
        const loginDetails = ({
            emailId: req.body.emailId,
            password: req.body.password,
        });

        userService.userLogin(loginDetails, (err, data) => {
            return err ? res.status(400).send({ success: false, message: err })
                : res.status(200).send({ success: true, message: "User Login Successful", data: data });
        });
    }
}

module.exports = new UserController();