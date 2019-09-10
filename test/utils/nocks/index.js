const nock = require('nock');

const nocks = {};

nocks.cleanAll = () => {
  nock.cleanAll();
};
nocks.searchStarShips = (options = {}) => {
  const url = 'https://swapi.co/api';
  if (options.errorMessage) {
    return nock(url)
      .get('/starships/', options.requestBody)
      .replyWithError(options.errorMessage);
  }
  return nock(url)
    .get('/starships/', options.requestBody)
    .reply(options.statusCode || 200, options.responseBody || []);
};

module.exports = nocks;
