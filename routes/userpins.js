const express = require('express');

const { UserPin, User, Pin } = require('../models');
const asyncHandler = require('./utils');

const router = express.Router()

router.post('/', asyncHandler(async (req, res) => {
    await UserPin.create({
        userId: parseInt(req.body.userId, 10),
        pinId: parseInt(req.body.pinId, 10)
    })
    await UserPin.save();
}))

router.get('/pin/:pid', asyncHandler(async (req, res) => {
    const users = await UserPin.findAll({ where: { pinId: parseInt(req.params.pid, 10) } })
    res.send(users)
}))

router.delete('/pin/:pid', asyncHandler(async (req, res) => {
    await UserPin.destroy({ where: { pinId: parseInt(req.params.pid, 10) } })
}))

router.get('/user/:uid', asyncHandler(async (req, res) => {
    const pins = await UserPin.findAll({ where: { userId: parseInt(req.params.uid, 10) } })
    res.send(pins)
}))

router.delete('/user/:uid', asyncHandler(async (req, res) => {
    await UserPin.destroy({ where: { userId: parseInt(req.params.uid, 10) } })
}))

module.exports = router;