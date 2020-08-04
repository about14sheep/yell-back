const express = require('express')
const { Pin, Message, sequelize } = require('../models');
const asyncHandler = require('./utils')

const router = express.Router()

router.get('/pins', asyncHandler(async (req, res) => {
    console.log(req.params.gl)
    const lat = 39.17211
    const lng = -76.894722
    const pins = await Pin.findAll({
        where: sequelize.fn('ST_DWithin', sequelize.col('geoLoc'), sequelize.literal('ST_MakePoint(' + lat + ', ' + lng + ')'), 8046),
        // include: { model: Message }
    })
    res.send(pins)
}));

router.get('/pins/:id', asyncHandler(async (req, res) => {
    const pin = await Pin.findByPk(parseInt(req.params.id, 10))
    res.send(pin)
}))

module.exports = router;