const { assert } = require('chai');
const sinon = require('sinon');
const supertest = require('supertest');
const nocks = require('../../utils/nocks');
const fixtures = require('../../utils/fixtures');
const app = require('../../../config/express');

describe('Post api/starship/ testes funcionais ', () => {
  let sandbox;
  before(() => {
    sandbox = sinon.createSandbox();
  });
  afterEach(async () => {
    sandbox.restore();
    nocks.cleanAll();
  });
  describe('Caso(s) de sucesso: Deve', () => {
    it('calcular as rotas mas retornar 200', async () => {
      const starshipsFixture = fixtures.starships.starshipsFixture.starship({
        results: [{
          name: 'Millennium Falcon',
          model: 'YT-1300 light freighter',
          manufacturer: 'Corellian Engineering Corporation',
          cost_in_credits: '100000',
          length: '34.37',
          max_atmosphering_speed: '1050',
          crew: '4',
          passengers: '6',
          cargo_capacity: '100000',
          consumables: '2 months',
          hyperdrive_rating: '0.5',
          MGLT: 75,
          starship_class: 'Light freighter',
        },
        {
          name: 'Y-wing',
          model: 'BTL Y-wing',
          manufacturer: 'Koensayr Manufacturing',
          cost_in_credits: '134999',
          length: '14',
          max_atmosphering_speed: '1000km',
          crew: '2',
          passengers: '0',
          cargo_capacity: '110',
          consumables: '1 week',
          hyperdrive_rating: '1.0',
          MGLT: 80,
          starship_class: 'assault starfighter',
        }],
      });
      const nockSearchStarShips = nocks.searchStarShips({
        responseBody: starshipsFixture,
      });
      const res = await supertest(app)
        .post('/api/starship')
        .send({ mglt: 1000000 })
        .set('Content-Type', 'application/json');
      assert.strictEqual(200, res.statusCode);
      assert.strictEqual(2, res.body.length);
      assert.deepEqual({ 'Millennium Falcon': 9 }, res.body[0]);
      assert.deepEqual({ 'Y-wing': 74 }, res.body[1]);
      assert.isTrue(nockSearchStarShips.isDone());
    });
    it('calcular as rotas mas retornar erro 404 pois não encontrou naves', async () => {
      const nockSearchStarShips = nocks.searchStarShips({
        statusCode: 200,
        responseBody: null,
      });
      const res = await supertest(app)
        .post('/api/starship')
        .send({ mglt: 1000000 })
        .set('Content-Type', 'application/json');
      assert.strictEqual(404, res.statusCode);
      assert.isTrue(nockSearchStarShips.isDone());
    });
  });
  describe('Caso(s) de falha: Deve', () => {
    it('Calcular as rotas mas retornar erro 400 pois não enviou o mglt', async () => {
      const res = await supertest(app)
        .post('/api/starship')
        .send({})
        .set('Content-Type', 'application/json');
      assert.strictEqual(400, res.statusCode);
    });
    it('Calcular as rotas mas retornar erro 500', async () => {
      const nockSearchStarShips = nocks.searchStarShips({
        statusCode: 404,
        responseBody: null,
      });
      const res = await supertest(app)
        .post('/api/starship')
        .send({ mglt: 1000000 })
        .set('Content-Type', 'application/json');
      assert.strictEqual(500, res.statusCode);
      assert.isTrue(nockSearchStarShips.isDone());
    });
  });
});
