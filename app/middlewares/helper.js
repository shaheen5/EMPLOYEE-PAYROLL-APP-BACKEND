/**********************************************************************************************************
 *  Execution    : 1. Default node with npm   cmd> npm server.js
                   2. If nodemon installed    cmd> nodemon start
 *
 * Purpose      : User authentication and authorization 
 *
 * @description  :bcrypt,dotenv package need to be installed & required before execution of this file 
 *
 * @file        : middlewares/helper.js
 * @overview    : validate user entered password ,generate jwt token to authenticate user 
 * @module      : check entered user password with password saved in db,generate token 
 * @author      : Shaheen M.
 * @version     : 1.0
 * @since       : 15-06-2021
 ********************************************************************************************************/
//import .env file
require('dotenv').config();
//import bcrypt  module
const bcrypt = require('bcrypt');
//import jwt module
const jwt = require('jsonwebtoken');

class Helper {
    /**
   * Method to compare given password and actual password stored in the database.
   * @param {*} userEnteredPassword password string provided by the user
   * @param {*} passwordInDB hashed password stored in the database
   * @returns boolean
   */
    checkPassword(userEnteredPassword, passwordInDB) {
        return userEnteredPassword && passwordInDB
            ? (!bcrypt.compareSync(userEnteredPassword, passwordInDB))
            : false;
    }
    /**
   * Method For Token generation
   * @param {object} userData data from client/user
   * @returns token
   */
    getGeneratedToken(userData) {
        try {
            const token = jwt.sign(userData, process.env.SECRET_KEY, {
                expiresIn: '200000s',
            });
            return token;
        } catch (error) {
            console.error();
        }
    }
    /**
   * To authenticate token
   * @param {*} req (express property)
   * @param {*} res (express property)
   * @param {*} next (express property)
   * @returns HTTP status and object
   */
    authenticateToken(req, res, next) {
        const token = req.get('token');

        if (token) {
            jwt.verify(token, process.env.SECRET_KEY, (err) => {
                if (err) {
                    return res.status(400).send({
                        success: false,
                        message: err.message || 'Invalid token!',
                    });
                } else {
                    next();
                }
            });
        } else {
            return res.status(401).send({
                success: false,
                message: 'Unauthorized User!',
            });
        }
    }
}
module.exports = new Helper();