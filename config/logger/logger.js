require('dotenv').config();

const { createLogger, format, transports } = require('winston');
const moment = require('moment');
const reqLogger = require('./request-logger');

const colorizer = format.colorize();

const myLogger = (() => {
  let loggerWinston;

  const logger = () => {
    if (!loggerWinston) {
      loggerWinston = createLogger({
        format: format.combine(
          format.timestamp(),
          format.simple(),
          format.printf((message) => {
            const level = message.level.toUpperCase();
            const timestamp = moment(message.timestamp).format('YYYY-MM-DD HH:mm:ss');
            return colorizer.colorize(message.level, `${timestamp} - ${level}: ${message.message}`);
          }),
        ),
        transports: [new transports.Console()],
        exitOnError: false,
        silent: false,
      });

      loggerWinston.stream = {
        write: (message) => {
          loggerWinston.info(message);
        },
      };
    }
    return loggerWinston;
  };
  const requestLogger = (newPattern) => {
    const loggerInstance = logger();
    const pattern = newPattern || ':method :url :reqbody - :status';

    return reqLogger(loggerInstance, pattern);
  };
  return {
    logger,
    requestLogger,
  };
})();

module.exports = myLogger;
