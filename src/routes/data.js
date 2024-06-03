const router = require('express').Router();
const logger = require('../utils/logger')('src/routes/data.js');

const Joi = require('joi');
const { validation } = require('../controllers/middleware');
const rules = require('../utils/validation-rules');
const funcurl = require('funcurl');
const um = new funcurl();

um.setBase('/data');

um.add(
    '/retrieve',
    'GET',
    Joi.object().keys({
        key: rules.default.number().positive()
    })
);

router.use(validation(um, { pack: true }));

module.exports = controller => {
    router.use((req, res, next) => {
        logger.network(
            `Received request: ${req.method} ${req.baseUrl}${req.path}`
        );
        next();
    });

    router.post('/insert', controller.insertData);

    router.get('/retrieve', controller.retrieveData);

    router.get('/health', (req, res, next) =>
        res.json({ message: 'OK' }).end()
    );

    return router;
};

module.exports._inject = ['data-controller'];
