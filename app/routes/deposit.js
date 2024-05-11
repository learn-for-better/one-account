const express = require('express');
const router = express.Router();
const Deposit = require('../models/Deposit');

router.post('/', async (req, res) => {
    const { deposits } = req.body;
    const date = new Date();
    const now = date.toISOString();

    if (deposits && deposits.length > 0) {
        const insertedGraph = await Deposit.transaction(async trx => {
            await Deposit.query(trx).insertGraph(deposits.map(deposit => {
                return {
                    date: now,
                    amount: deposit.amount,
                    description: deposit.description
                }
            }));

        });

        res.json(insertedGraph);
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


module.exports = router;