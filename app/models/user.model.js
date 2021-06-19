const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true,
        validate: /^[a-zA-Z]{3,20}$/,
    },
    email: {
        type: String,
        required:true,
        lowercase: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
});
const User = mongoose.model('User', UserSchema);

class UserModel {
    addNewUser = (userData,callback) => {
        //create new user
        const user = new User({
            userName:userData.userName,
            emailId: userData.email,
            password: userData.password
        });
        user.save((error, userData) => {
            return (error) ? callback(error, null) : callback(null, userData);
        });
    }    
}
module.exports = new UserModel();