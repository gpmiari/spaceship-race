const logger = require('../../../config/logger').logger();
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

const getStarshipService = async (query = '') => {
  const response = await clientSwapi.searchStarShips(query);
  if (!response) {
    logger.error('Not found starships');
    return null;
  }
  const starships = response.results.map((item) => buildStarship(item));
  if (response.next) {
    const newQuery = response.next.split('?');
    const newReponse = await getStarshipService(`?${newQuery[1]}`);
    starships.push(newReponse);
  }
  return starships;
};

module.exports = {
  getStarshipService,
};
