const Joi = require('joi');

const UserObjectSchema = Joi.object({
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
module.exports = UserObjectSchema;