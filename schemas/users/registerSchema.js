const Joi = require("joi");

const registerSchema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().email().required(),
    
})

module.exports = registerSchema