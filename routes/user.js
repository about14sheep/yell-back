const express = require('express');
const asyncHandler = require('./utils')
const db = require('../models');

const router = express.Router();

router.get('/users/:id', asyncHandler(async (req, res) => {
    const user = await db.User.findByPk(parseInt(req.params.id, 10));
    res.send(user)
}))

module.exports = router;