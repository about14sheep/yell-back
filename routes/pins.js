const express = require('express')
const { Pin, Message, sequelize } = require('../models');
const asyncHandler = require('./utils')

const router = express.Router()

router.get('/pins/:gl', asyncHandler(async (req, res) => {
    console.log(req.params.gl)
    const lat = 39.807111
    const lng = -76.984722
    const pins = await Pin.findAll({
        where: sequelize.fn('ST_DWithin', sequelize.col('geoLoc'), sequelize.literal('ST_MakePoint(' + lat + ', ' + lng + ')'), 8046),
        include: { model: Message }
    })
    res.send(pins)
}))
module.exports = router;