const httpStatus = require('http-status-codes');
const logger = require('../../utils/logger')(
    'src/controllers/middleware/errorHandler.js'
);

module.exports = () => (err, req, res, next) => {
    if (typeof err === 'string') {
        // custom application error
        logger.error('Custom application error');
        return res.status(httpStatus.BAD_REQUEST).json({ message: err });
    }

    if (err.name === 'UnauthorizedError') {
        // jwt authentication error

        logger.error('JWT authentication error');
        return res
            .status(httpStatus.UNAUTHORIZED)
            .json({ message: 'Invalid Token' });
    }

    if (err.name === 'ValidationError') {
        logger.error('Validation error ' + err.message);
        return res
            .status(httpStatus.BAD_REQUEST)
            .json({ message: err.message });
    }

    if (err.name === 'JoiValidation') {
        // if validation is not defined, just show a warning
        if (err.code === httpStatus.NOT_FOUND) {
            logger.warn('Joi error: ' + err.message);
            return next();
        } else {
            logger.error('Joi error: ' + err.message);
        }
        return res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .json({ message: err.message });
    }

    // default to 500 server error
    logger.error('General server error ' + err.message);

    return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: err.message });
};
