const httpStatus = require('http-status-codes');

// The `service` parameter will be inject using the factory associated to `data-service`
module.exports = service => {
    const insertData = async (req, res) => {
        const { key, value } = req.query;
        const { ok, err } = await service.put(key, value);

        if (ok) {
            res.status(httpStatus.CREATED).json([]);
        } else {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json(err);
        }
    };

    const retrieveData = async (req, res) => {
        const { key } = req._sanitized;
        const { ok, result, err } = await service.get(key);

        if (ok) {
            res.status(httpStatus.OK).json(result);
        } else {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json(err);
        }
    };

    return {
        insertData,
        retrieveData
    };
};

module.exports._inject = ['data-service'];
