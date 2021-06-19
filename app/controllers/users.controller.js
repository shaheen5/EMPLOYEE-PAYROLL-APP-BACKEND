
const  userService = require('../services/user.service');

class UserController {
    //register user
    registerUser = (req,res)=>{
        console.log(req.body);
        userService.registerUser(req.body,(err,userData)=>{
            if (err) {
                return res.status(500).send({
                    message: err.message || "Some error occurred while registering user."
                });
            }
            console.log("userdata= recieved=",userData);
            res.send(userData);
        });
    }

    //login user
    userLogin(){}
}

module.exports = new UserController();