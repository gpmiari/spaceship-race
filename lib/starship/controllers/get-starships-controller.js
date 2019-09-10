const logger = require('../../../config/logger')
  .logger();

const services = require('../services');

const getStarship = async (req, res) => {
  try {
    const starships = await services.getStarshipService();
    if (!starships) {
      logger.error('Not found starship');
      return res.sendStatus(204);
    }
    return res.status(200).send(starships);
  } catch (ex) {
    logger.error(`Error on get starship: ${ex}`);
    return res.sendStatus(500);
  }
};

module.exports = getStarship;
