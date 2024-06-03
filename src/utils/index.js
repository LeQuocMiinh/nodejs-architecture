const logger = require('./logger');

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

module.exports = {
    logger,
    sleep
};
