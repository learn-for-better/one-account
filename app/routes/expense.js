const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');

router.post('/', async (req, res) => {
    const { description, amount, tags } = req.body;
    const date = new Date();
    const now = date.toISOString();

    const splitTags = new Set(tags.flatMap(tag => tag.split(',').map(tag => tag.trim())));
    const insertedGraph = await Expense.transaction(async trx => {
        const existingTags = await trx('tags');
        const existingTagNames = new Set(existingTags.map(tag => tag.name));
        const inputTagNames =  Array.from(splitTags);
        
        const newTagNames = inputTagNames.filter(tag => !existingTagNames.has(tag));

        if (newTagNames.length > 0) {
            await trx('tags').insert(newTagNames.map(tag => ({ created_date: now, updated_date: now, name: tag }))).returning('id')
        }

        const relatedTags = await trx('tags').whereIn('name', inputTagNames);
        const expense = await Expense.query(trx).insertGraph({
            created_date: now,
            updated_date: now,
            date: now,
            description,
            amount
        });

        for (let id of relatedTags.map(tag => tag.id)) {
           await expense.$relatedQuery('tags', trx).relate(id);
        }

        return expense;
    });

    res.json(insertedGraph.$id());
});

router.get('/', async (req, res) => {
    const expenses = await Expense.query()
        .withGraphFetched('tags')
        .modifyGraph('tags', builder => {
            builder.select('id', 'name');
        });

    res.json(expenses);
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    const expense = await Expense.query().findById(id);

    if (expense) {
        await expense.$relatedQuery('tags').unrelate();

        const deletedCount = await Expense.query().deleteById(id);

        res.status(202).json(deletedCount);
    } else {
        res.status(404).send({ error: 'Expense not found' });
    }
});
module.exports = router;