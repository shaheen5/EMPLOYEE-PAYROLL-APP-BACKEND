const User = require('../models/user.model');

class UserService {
    //register user
    registerUser = (userData,callback)=> {
        User.addNewUser(userData,(error,data)=>{
            return (error) ? callback(error, null) : callback(null, data);
        });
    }

    //login user
    userLogin = (loginDetails,callback)=>{
        User.userLogin(loginDetails,(err,data)=>{
            return err ? callback(err,null) : callback(null,data);
        });
    }


    
}
module.exports = new UserService();