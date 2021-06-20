const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        validate: /^[a-zA-Z]{3,20}$/
    },
    lastName: {
        type: String,
        required: true,
        validate: /^[a-zA-Z]{3,20}$/
    },
    emailId: {
        type: String,
        validate: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9]+[.]+[a-zA-Z]+$/,
        unique: true
    },
    password: {
        type: String,
        required: true,
        validate: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/
    }
}, {
    timestamps: true
});
const User = mongoose.model('User', UserSchema);

class UserRegistrationAndLogin {
    //register new user
    addNewUser = (userData,callback) => {
        //create new user
        const user = new User({
            firstName: userData.firstName,
            lastName: userData.lastName,
            emailId: userData.emailId,
            password: userData.password
        });
        user.save((error, userData) => {
            return (error) ? callback(error, null) : callback(null, userData);
        });
    }    

    //login user
    userLogin = (loginDetails,callback)=> {
        User.findOne({emailId:loginDetails.emailId},(err,data)=>{
            if(err) return callback(err,null);
            if(!data) return callback('User Not Found',null);
            else return callback(null,data);
        });
    }
}
module.exports = new UserRegistrationAndLogin();