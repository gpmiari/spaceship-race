const request = require('request');
const { promisify } = require('util');
require('dotenv').config();

const logger = require('../../../config/logger').logger();

const searchStarShips = async (query = '') => {
  const url = `https://swapi.co/api/starships/${query}`;

  try {
    const options = {
      url,
      json: true,
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'GET',
    };
    const requestPromise = promisify(request);
    const response = await requestPromise(options);
    if (response.statusCode !== 200) {
      const errorMessage = `Error ${response.statusCode} on get starships.`;
      logger.error(errorMessage);
      throw new Error(errorMessage);
    }
    logger.info(`Get starships: ${response.statusCode}`);
    return response.body;
  } catch (ex) {
    logger.error(`Error on get starships: ${ex}`);
    throw ex;
  }
};

module.exports = {
  searchStarShips,
};
