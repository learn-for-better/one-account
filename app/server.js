const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// db initialization
const Knex = require('knex');
const knexConfig = require('./knexfile');
const { Model } = require('objection');

// api documentation
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const port = 3003;
const cors = require('cors');

app.use(cors());

app.use(bodyParser.json());

// Initialize knex.
Model.knex(Knex(knexConfig.default));

app.use('/expenses', require('./routes/expense'));
app.use('/tags', require('./routes/tag'));

app.listen(port, () => {
  console.log('Server is running on port ', port);
});