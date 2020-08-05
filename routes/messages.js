const express = require('express');
const { check, validationResult } = require('express-validator');

const { authenticated } = require('./security-utils');
const asyncHandler = require('./utils');
const { Message, User } = require('../models');
const user = require('../models/user');

const router = express.Router();

const msgText = check('messageText')
    .not().isEmpty()
    .withMessage('Can\'t send empty messages')

router.post('/pins/:id', msgText, asyncHandler(async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return next({ status: 422, errors: errors.array() });
    }
    console.log(req.body)
    const message = await Message.build({
        userId: parseInt(req.body.userId, 10),
        pinId: parseInt(req.body.pinId, 10),
        messageText: req.body.messageText
    })
    await message.save()
}))

router.get('/pins/:id', asyncHandler(async (req, res) => {
    const pinMsgs = await Message.findAll({ where: { pinId: parseInt(req.params.id, 10) }, include: { model: User, attributes: ['username'] } })
    res.send(pinMsgs)
}))


module.exports = router;