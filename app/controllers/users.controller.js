
const  userService = require('../services/user.service');

class UserController {
    //register user
    registerUser = (req,res)=>{
        userService.registerUser(req.body,(err,userData)=>{
            if (err) {
                return res.status(500).send({
                    message: err.message || "Some error occurred while registering user."
                });
            }
            res.send(userData);
        });
    }

    //login user
    userLogin =(req,res)=>{
        const loginDetails = ({
            emailId : req.body.emailId,
            password : req.body.password,
        });

        userService.userLogin(loginDetails,(err,data)=>{
            return err ? res.status(400).send({success:false,message:err})
                   : res.status(200).send({success:true,message:"User Login Successful",data:data});
        });
    }
}

module.exports = new UserController();