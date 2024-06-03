const Joi = require('joi');
const logger = require('../../utils/logger')(
    'src/controllers/middleware/validation.js'
);
const { pick } = require('lodash');

const options = {
    abortEarly: true,
    stripUnknown: true
};

class JoiError extends Error {
    constructor(message, code) {
        super(message);
        this.name = 'JoiValidation';
        this.code = code;
    }
}

module.exports = (um, config = {}) => (req, res, next) => {
    const route = req.path;
    const method = req.method;

    logger.joi(`Validating ${method}:${um.setBase}${route}`);

    if (um.match(route, method)) {
        const { func, params } = um.get(route, method);
        if (func) {
            const reqData = { ...req.body, ...req.query };
            const srcData = { ...reqData, ...params };
            return Joi.validate(srcData, func, options, (err, data) => {
                // replace original data with sanitized data
                if (err) {
                    throw err;
                } else {
                    if (config.pack) {
                        req._sanitized = data;
                    } else {
                        req.body = pick(data, req.body);
                        req.query = pick(data, req.query);
                        req.params = pick(data, req.params);
                    }
                    next();
                }
            });
        } else {
            throw new Error(`Logic error inside URL matcher`);
        }
    } else {
        logger.warn(
            `Joi error: Validation is not defined for the route ${method} : ${route}`
        );
        return next();
    }
};
