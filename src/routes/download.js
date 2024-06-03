const router = require('express').Router();
const logger = require('../utils/logger')('src/routes/data.js');

const Joi = require('joi');
const { validation } = require('../controllers/middleware');
const rules = require('../utils/validation-rules');
const funcurl = require('funcurl');

const um = new funcurl();

um.setBase('/download');

um.add(
    '/tracks',
    'POST',
    Joi.object().keys({
        tracks: rules.default.array().required()
    })
);

router.use((req, res, next) => {
    logger.network(`Received request: ${req.method} ${req.baseUrl}${req.path}`);
    next();
});

router.use(validation(um, { pack: true }));

module.exports = controller => {
    router.post('/tracks', controller.getTracks);

    return router;
};

module.exports._inject = ['download-controller'];
