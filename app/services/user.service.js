const User = require('../models/user.model');

class UserService {
    registerUser = (userData,callback)=> {
        User.addNewUser(userData,(error,data)=>{
            return (error) ? callback(error, null) : callback(null, data);
        });
    }
}
module.exports = new UserService();