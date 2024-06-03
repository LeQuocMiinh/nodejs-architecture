const httpStatus = require('http-status-codes');

// The `service` parameter will be inject using the factory associated to `data-service`
module.exports = () => {
    const user = {
        get: (req, res) => {
            res.status(httpStatus.OK).json({
                mehtod: 'GET',
                action: 'retrieve',
                data: req._sanitized
            });
        },

        put: (req, res) => {
            res.status(httpStatus.CREATED).json({
                mehtod: 'PUT',
                action: 'create',
                data: req._sanitized
            });
        },
        delete: (req, res) => {
            res.status(httpStatus.OK).json({
                mehtod: 'DELETE',
                action: 'delete',
                data: req._sanitized
            });
        }
    };

    return {
        user
    };
};
