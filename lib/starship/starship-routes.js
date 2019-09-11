const controllers = require('./controllers');
const validation = require('../validation');

const routes = (router) => {
  router.get('/api/starship', controllers.getStarship);
  router.post('/api/starship', validation.calculateStops, controllers.postStarship);
};

module.exports = routes;
