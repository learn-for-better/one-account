const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');

router.post('/', async (req, res) => {
    const { description, amount, tags } = req.body;
    const date = new Date();
    const now = date.toISOString();
    const insertedGraph = await Expense.transaction(async trx => { 
        return Expense.query(trx).insertGraph({
            created_date: now,
            updated_date: now,
            date: now,
            description,
            amount,
            tags: tags.map(tag => ({created_date: now, updated_date: now, tag: tag }))
        });
    });
    
    res.json(insertedGraph.$id());
    });

router.get('/', async (req, res) => {
    const expenses = await Expense.query()
    .withGraphFetched('tags')
    .modifyGraph('tags', builder => {
        builder.select('id', 'tag');
    });
    res.json(expenses);
});

module.exports = router;    