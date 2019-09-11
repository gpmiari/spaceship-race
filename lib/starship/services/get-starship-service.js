const logger = require('../../../config/logger')
  .logger();
const { clientSwapi } = require('../../client');

const buildStarship = (starship) => ({
  name: starship.name,
  model: starship.model,
  manufacturer: starship.manufacturer,
  costInCredits: starship.cost_in_credits,
  length: starship.length,
  maxAtmospheringSpeed: starship.max_atmosphering_speed,
  crew: starship.crew,
  passengers: starship.passengers,
  cargoCapacity: starship.cargo_capacity,
  consumables: starship.consumables,
  hyperdriveRating: starship.hyperdrive_rating,
  mglt: starship.MGLT,
  starshipClass: starship.starship_class,
});

const getStarship = async (starship = [], query = '') => {
  try {
    const response = await clientSwapi.searchStarShips(query);
    if (!response) {
      logger.error('Not found starships');
      return null;
    }
    if (response.next) {
      if (response.results) {
        starship.push(response.results.map((s) => buildStarship(s)));
      }
      const newQuery = response.next.split('?');
      return await getStarship(starship, `?${newQuery[1]}`);
    }
    if (response.results) {
      return starship.push(response.results.map((s) => buildStarship(s)));
    }
    return null;
  } catch (error) {
    logger.error(error);
    throw new Error(error);
  }
};

const flatten = (list) => list.reduce((a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []);

const getStarshipService = async () => {
  const starships = [];
  await getStarship(starships);
  if (!starships) {
    logger.error('Not found starships');
    return null;
  }
  return flatten(starships);
};

module.exports = {
  getStarshipService,
};
