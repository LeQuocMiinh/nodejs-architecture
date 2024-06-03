const router = require('express').Router();
const logger = require('../utils/logger')('src/routes/users.js');

module.exports = controller => {
    router.get('/', (req, res, next) => {
        res.json({ message: 'respond with a resource' }).end();
    });

    router
        .route('/:userId')
        .all((req, res, next) => {
            logger.network(`REST enpoint for user ${req.params.userId}`);
            next();
        })
        .all((req, res, next) => {
            req._sanitized = { id: req.params.userId };
            next();
        })
        .get(controller.user.get)
        .put(controller.user.put)
        .delete(controller.user.delete);

    return router;
};

module.exports._inject = ['users-controller'];
