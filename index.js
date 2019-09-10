const { app, logger } = require('./config');
require('dotenv').config();
const pack = require('./package');

const port = process.env.PORT || 3001;

process.title = pack.name;

const shutdown = (event) => () => {
  logger.info(`Server receive signal to shutdown, with event ${event}`);
  process.exit(0);
};

process.on('SIGTERM', shutdown('SIGTERM'))
  .on('SIGINT', shutdown('SIGINT'))
  .on('SIGHUP', shutdown('SIGHUP'))
  .on('uncaughtException', (er) => {
    logger.info(`uncaughtException caught the error: ${er.message}`);
    throw er;
  })
  .on('exit', (code) => {
    logger.info(`Node process exit with code: ${code}`);
    // database.close();
  });

app.listen(port, (err) => {
  if (err) {
    logger.error(`Error on listen port. ${err.message}`);
  } else {
    logger.info('------------------------------------------------------------------');
    logger.info(`${pack.name} - Version: ${pack.version}`);
    logger.info('------------------------------------------------------------------');
    logger.info(`Express server listening on port: ${port}`);
    logger.info('------------------------------------------------------------------');
  }
  app.on('close', () => {
    logger.info('Shutdown the application server');
  });
});
