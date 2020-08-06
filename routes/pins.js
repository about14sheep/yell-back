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
    const pin = await Pin.build({
        title: req.body.title,
        geoLoc: sequelize.literal(req.body.geoLoc),
        ownerId: parseInt(req.body.ownerId, 10),
    })
    await pin.save();
}))

router.get('/', asyncHandler(async (req, res) => {
    const lat = 39.17211
    const lng = -76.894722
    const pins = await Pin.findAll({
        where: sequelize.fn('ST_DWithin', sequelize.col('geoLoc'), sequelize.literal('ST_MakePoint(' + lat + ', ' + lng + ')'), 8046)
    })
    res.send(pins)
}));

router.get('/:id', asyncHandler(async (req, res) => {
    const pin = await Pin.findByPk(parseInt(req.params.id, 10))
    res.send(pin)
}))

module.exports = router;