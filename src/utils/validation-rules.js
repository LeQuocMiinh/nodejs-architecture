const Joi = require('joi');
const Joix = Joi.extend(require('joi-phone-number'));

module.exports = {
    id: Joi.number()
        .integer()
        .positive(),
    userID: Joi.string().uuid({ version: 'uuidv4' }),
    username: Joi.string()
        .min(5)
        .max(15),
    password: Joi.string().min(8),
    name: Joi.string(),
    email: Joi.string().email(),
    phone: Joix.string().phoneNumber(),
    postalCode: Joi.number()
        .min(10000)
        .max(9999),
    default: Joi
};
