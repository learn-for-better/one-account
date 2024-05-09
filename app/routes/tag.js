const express = require('express');
const router = express.Router();
const Tags = require('../models/Tags');

router.get('/', async (req, res) => {
    const tags = await Tags.query().select('id', 'name');

    res.json(tags);
});

module.exports = router;