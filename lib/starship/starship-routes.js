const controllers = require('./controllers');

const routes = (router) => {
  router.get('/', controllers.getStarship);
};

module.exports = routes;
