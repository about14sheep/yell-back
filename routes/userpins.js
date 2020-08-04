const express = require('express');

const { UserPin, User, Pin } = require('../models');
const asyncHandler = require('./utils');

const router = express.Router()

router.get('/userpins/pin/:pid', asyncHandler(async (req, res) => {
    const users = await UserPin.findAll({ where: { pinId: parseInt(req.params.pid, 10) } })
    res.send(users)
}))

router.get('/userpins/user/:uid', asyncHandler(async (req, res) => {
    const pins = await UserPin.findAll({ where: { userId: parseInt(req.params.uid, 10) } })
    res.send(pins)
}))

module.exports = router;