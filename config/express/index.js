const express = require('express');

const app = express();
const cors = require('cors');
const compression = require('compression');
const bodyParser = require('body-parser');
const logger = require('../logger').requestLogger();

const starship = require('../../lib/starship');

const router = new express.Router();
starship.routes(router);

app.set('json spaces', 2);
app.use(cors());
app.use(compression());
app.use(logger);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(router);
module.exports = app;
