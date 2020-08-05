const express = require('express');
const { check, validationResult } = require('express-validator');

const { authenticated } = require('./security-utils');
const asyncHandler = require('./utils');
const { Message, User } = require('../models');

const router = express.Router();

router.get('/pins/:id', asyncHandler(async (req, res) => {
    const pinMsgs = await Message.findAll({ where: { pinId: parseInt(req.params.id, 10) }, include: { model: User, attributes: ['username'] } })
    res.send(pinMsgs)
}))

module.exports = router;