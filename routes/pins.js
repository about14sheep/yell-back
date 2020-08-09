const express = require('express')
const { check, validationResult } = require('express-validator');

const { Pin, sequelize } = require('../models');
const asyncHandler = require('./utils')

const router = express.Router()

const title = check('title')
    .not().isEmpty()
    .withMessage('Title must not be empty');

const geoLoc = check('geoLoc')
    .not().isEmpty()
    .withMessage('Location (geoLoc) must not be empty');

router.post('/', title, geoLoc, asyncHandler(async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return next({ status: 422, errors: errors.array() });
    }
    const { lat, lng } = req.body.geoLoc
    const pin = await Pin.build({
        title: req.body.title,
        geoLoc: sequelize.literal(`ST_MakePoint(${lat}, ${lng})`),
        ownerId: parseInt(req.body.ownerId, 10),
    })
    await pin.save();
}))

router.get('/', asyncHandler(async (req, res) => {
    const lat = parseFloat(req.query.lat)
    const lng = parseFloat(req.query.lng)
    const pins = await Pin.findAll({
        where: sequelize.fn('ST_DWithin', sequelize.col('geoLoc'), sequelize.literal(`ST_MakePoint(${lat}, ${lng})`), 8046)
    })
    res.send(pins)
}));

router.get('/check', asyncHandler(async (req, res) => {
    const lat = parseFloat(req.query.lat)
    const lng = parseFloat(req.query.lng)
    try {
        const pin = await Pin.findOne({
            where: sequelize.fn('ST_DWithin', sequelize.col('geoLoc'), sequelize.literal(`ST_MakePoint(${lat}, ${lng})`), 10)
        })
        res.send(pin)

    } catch (e) {
        console.log(e)
    }
}))

module.exports = router;