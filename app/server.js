const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const Knex = require('knex');
const knexConfig = require('./knexfile');
const { Model } = require('objection');

app.use(bodyParser.json());

// Initialize knex.
Model.knex(Knex(knexConfig.default));

app.use('/expense', require('./routes/expense'));

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});