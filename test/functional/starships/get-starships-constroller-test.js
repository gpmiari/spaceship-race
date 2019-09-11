const { assert } = require('chai');
const sinon = require('sinon');
const supertest = require('supertest');
const nocks = require('../../utils/nocks');
const fixtures = require('../../utils/fixtures');
const app = require('../../../config/express');

describe('get api/starship/ testes funcionais ', () => {
  let sandbox;
  before(() => {
    sandbox = sinon.createSandbox();
  });
  afterEach(async () => {
    sandbox.restore();
    nocks.cleanAll();
  });
  describe('Caso(s) de sucesso: Deve', () => {
    it('buscar os as naves e retornar status 200', async () => {
      const starshipsFixture = fixtures.starships.starshipsFixture.starship({ count: 2 });
      const nockSearchStarShips = nocks.searchStarShips({
        responseBody: starshipsFixture,
      });
      const res = await supertest(app)
        .get('/api/starship')
        .set('Content-Type', 'application/json');
      assert.strictEqual(200, res.statusCode);
      assert.strictEqual(3, res.body.length);
      assert.strictEqual(starshipsFixture.results[0].name, res.body[0].name);
      assert.strictEqual(starshipsFixture.results[0].model, res.body[0].model);
      assert.strictEqual(starshipsFixture.results[0].manufacturer, res.body[0].manufacturer);
      assert.strictEqual(starshipsFixture.results[0].cost_in_credits, res.body[0].costInCredits);
      assert.strictEqual(starshipsFixture.results[0].length, res.body[0].length);
      assert.strictEqual(starshipsFixture.results[0].max_atmosphering_speed,
        res.body[0].maxAtmospheringSpeed);
      assert.strictEqual(starshipsFixture.results[0].crew, res.body[0].crew);
      assert.strictEqual(starshipsFixture.results[0].passengers, res.body[0].passengers);
      assert.strictEqual(starshipsFixture.results[0].cargo_capacity, res.body[0].cargoCapacity);
      assert.strictEqual(starshipsFixture.results[0].consumables, res.body[0].consumables);
      assert.strictEqual(starshipsFixture.results[0].hyperdrive_rating,
        res.body[0].hyperdriveRating);
      assert.strictEqual(starshipsFixture.results[0].MGLT, res.body[0].mglt);
      assert.strictEqual(starshipsFixture.results[0].starship_class, res.body[0].starshipClass);
      assert.strictEqual(starshipsFixture.results[1].name, res.body[1].name);
      assert.strictEqual(starshipsFixture.results[1].model, res.body[1].model);
      assert.strictEqual(starshipsFixture.results[1].manufacturer, res.body[1].manufacturer);
      assert.strictEqual(starshipsFixture.results[1].cost_in_credits, res.body[1].costInCredits);
      assert.strictEqual(starshipsFixture.results[1].length, res.body[1].length);
      assert.strictEqual(starshipsFixture.results[1].max_atmosphering_speed,
        res.body[1].maxAtmospheringSpeed);
      assert.strictEqual(starshipsFixture.results[1].crew, res.body[1].crew);
      assert.strictEqual(starshipsFixture.results[1].passengers, res.body[1].passengers);
      assert.strictEqual(starshipsFixture.results[1].cargo_capacity, res.body[1].cargoCapacity);
      assert.strictEqual(starshipsFixture.results[1].consumables, res.body[1].consumables);
      assert.strictEqual(starshipsFixture.results[1].hyperdrive_rating,
        res.body[1].hyperdriveRating);
      assert.strictEqual(starshipsFixture.results[1].MGLT, res.body[1].mglt);
      assert.strictEqual(starshipsFixture.results[1].starship_class, res.body[1].starshipClass);
      assert.isTrue(nockSearchStarShips.isDone());
    });
    it('buscar as naves e não encontrar em nenhuma e retornar status 404', async () => {
      const nockSearchStarShips = nocks.searchStarShips({
        statusCode: 200,
        responseBody: null,
      });
      const res = await supertest(app)
        .get('/api/starship')
        .set('Content-Type', 'application/json');
      assert.strictEqual(404, res.statusCode);
      assert.isTrue(nockSearchStarShips.isDone());
    });
  });
  describe('Caso(s) de falha: Deve', () => {
    it('buscar os as naves e retornar status 200', async () => {
      const nockSearchStarShips = nocks.searchStarShips({
        statusCode: 404,
        responseBody: null,
      });
      const res = await supertest(app)
        .get('/api/starship')
        .set('Content-Type', 'application/json');
      assert.strictEqual(500, res.statusCode);
      assert.isTrue(nockSearchStarShips.isDone());
    });
  });
});
