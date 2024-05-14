const express = require('express');
const router = express.Router();
const Deposit = require('../models/Deposit');

router.post('/', async (req, res) => {
    const body = req.body;
    try {
        if (body.length === 0) {
            res.status(400).json({ error: 'Bad Request' });
            return;
        }
        for (let i = 0; i < body.length; i++) {
            const date = new Date(body[i].date);
            const deposits = body[i].records;
            const isoDate = date.toISOString();

            if (deposits && deposits.length > 0) {
                try {
                    const insertedGraph = await Deposit.transaction(async trx => {
                        await Deposit.query(trx).upsertGraph(deposits.map(deposit => {
                            return {
                                date: isoDate,
                                amount: deposit.amount,
                                description: deposit.description
                            }
                        }), { insertMissing: true });
                    });

                    res.status(201).json(insertedGraph);
                } catch (e) {
                    console.log(e);
                    res.status(500).json({ error: 'Internal Server Error' });
                }
            }
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: 'Internal Server Error' });
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