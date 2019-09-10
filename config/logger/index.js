const myLogger = require('./logger');

const { logger } = myLogger;
const { requestLogger } = myLogger;

const services = {
  logger,
  requestLogger,
};

module.exports = services;
