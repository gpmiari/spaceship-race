const Chance = require('chance');

const chance = new Chance();

const starship = (data = {}) => {
  const result = {
    count: data.count || chance.integer({
      min: 0,
      max: 5,
    }),
  };

  if (data.next) {
    result.next = data.next;
  }

  if (data.previous) {
    result.previous = data.previous;
  }

  if (data.results) {
    result.results = data.results;
  } else {
    result.results = [];
    /* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
    for (let index = 0; index <= result.count; index++) {
      result.results.push({
        name: chance.word(),
        model: chance.word(),
        manufacturer: chance.word(),
        cost_in_credits: chance.pickone('unknown', chance.integer({
          min: 1000,
        })),
        length: chance.floating({
          min: 0,
          fixed: 1,
        }),
        max_atmosphering_speed: chance.integer({
          min: 0,
        }),
        crew: chance.integer({
          min: 0,
        }),
        passengers: chance.pickone('unknown', chance.integer({
          min: 1,
        })),
        cargo_capacity: chance.pickone('unknown', chance.integer({
          min: 1000,
        })),
        consumables: chance.pickone('unknown', chance.integer({
          min: 1000,
        })),
        hyperdrive_rating: chance.floating({
          min: 0,
          fixed: 1,
        }),
        MGLT: chance.pickone('unknown', chance.integer({
          min: 1000,
        })),
        starship_class: chance.word(),
      });
    }
  }
  return result;
};

module.exports = {
  starship,
};
