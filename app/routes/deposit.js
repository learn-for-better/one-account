const express = require('express');
const router = express.Router();
const Deposit = require('../models/Deposit');

router.post('/', async (req, res) => {
    const deposits = req.body;
    const date = new Date();
    const now = date.toISOString();

    if (deposits && deposits.length > 0) {
        try {
            const insertedGraph = await Deposit.transaction(async trx => {
                await Deposit.query(trx).insertGraph(deposits.map(deposit => {
                    return {
                        date: now,
                        amount: deposit.amount,
                        description: deposit.description
                    }
                }));
            });

            res.status(201).json(insertedGraph);
        } catch (e) {
            console.log(e);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
});

router.get('/', async (req, res) => {
    try {
        const deposits = await Deposit.query();

        res.json(deposits);
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deposit = await Deposit.query().deleteById(id);

        res.json(deposit);
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router;