const logger = require('../../../config/logger')
  .logger();
const getService = require('./get-starship-service');

const capacityTravel = (consumables, mglt) => {
  let capacity;
  if (consumables.includes('years') || consumables.includes('year')) {
    const years = consumables.replace('years', '')
      .replace('year', '')
      .trim();
    const newTime = (years * 365) * 24;
    capacity = newTime * mglt;
  }
  if (consumables.includes('months') || consumables.includes('month')) {
    const months = consumables.replace('months', '')
      .replace('month', '')
      .trim();
    const newTime = (months * 30) * 24;
    capacity = newTime * mglt;
  }
  if (consumables.includes('weeks') || consumables.includes('week')) {
    const week = consumables.replace('week', '')
      .replace('week', '')
      .trim();
    const newTime = (week * 7) * 24;
    capacity = newTime * mglt;
  }
  if (consumables.includes('days') || consumables.includes('day')) {
    const days = consumables.replace('days', '')
      .replace('day', '')
      .trim();
    const newTime = days * 24;
    capacity = newTime * mglt;
  }
  return capacity;
};

const calculate = (item, distance) => {
  try {
    const { mglt, consumables } = item;
    if (mglt === 'unknown' || consumables === 'unknown') {
      return 'unknown';
    }
    const newCapacityTravel = capacityTravel(consumables, mglt);
    return Math.round(distance / newCapacityTravel);
  } catch (ex) {
    throw new Error(ex);
  }
};

const buildSapceshipCapacity = (item, distance) => ({
  [item.name]: calculate(item, distance),
});

const calculateStops = async (distance) => {
  const starships = await getService.getStarshipService();
  if (!starships) {
    logger.error('Not found starships');
    return null;
  }
  return starships.map((item) => buildSapceshipCapacity(item, distance));
};

module.exports = {
  calculateStops,
};
