const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const app = express();

const Knex = require('knex');
const knexConfig = require('./knexfile');
const { Model } = require('objection');
const {Expense} = require('./models/Expense');

app.use(bodyParser.json());

const dbHost = process.env.DB_HOST || 'localhost';

const pool = new Pool({
  host: dbHost,
  database: 'postgres',
  user: 'postgres',
  password: 'admin',
});

// Initialize knex.
const knex = Knex(knexConfig.default);
Model.knex(knex);

app.get('/test', async (req, res) => {
  const result = await Expense.query();
  console.log(result);
  res.json({ message: 'Hello World' });
});

app.post('/expense', async (req, res) => {
  const client = await pool.connect();
  try {
    const { description, amount, tags } = req.body;
    const now = new Date();

    const expenseResult = await client.query(
      'INSERT INTO expense (created_date, updated_date, date, description, amount) VALUES ($1, $2, $3, $4, $5) RETURNING id',
      [now, now, now, description, amount]
    );
    const expenseId = expenseResult.rows[0].id;
    for (let tag of tags) {
      let tagResult = await client.query('SELECT id FROM tags WHERE tag = $1', [tag]);

      if (tagResult.rows.length === 0) {
        tagResult = await client.query(
          'INSERT INTO tags (created_date, updated_date, tag) VALUES ($1, $2, $3) RETURNING id',
          [now, now, tag]
        );
      }

      const tagId = tagResult.rows[0].id;

      await client.query('INSERT INTO expense_tags (created_date, updated_date, expense_id, tag_id) VALUES ($1, $2, $3, $4)', [now, now, expenseId, tagId]);
    }

    res.json({ id: expenseId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    client.release();
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});