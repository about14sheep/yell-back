const express = require('express');
const { check, validationResult } = require('express-validator');

const UserUts = require('./user-utils');
const { authenticated, generateToken } = require('./security-utils');
const asyncHandler = require('./utils');
const { User } = require('../models');

const router = express.Router();

const email = check('email')
    .isEmail()
    .withMessage('Must be valid email')
    .normalizeEmail();

const username = check('username')
    .not().isEmpty()
    .withMessage('Must have username');

const password = check('password')
    .not().isEmpty()
    .withMessage('Must provide password');

router.post('/', email, password, username, asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next({ status: 422, errors: errors.array() });
    }
    const user = await UserUts.create(req.body);
    const { jti, token } = generateToken(user);
    user.tokenId = jti;
    console.log(user)
    await user.save();
    res.json({ token, user: user.toSafeObject() });
}))

router.get('/me', authenticated, (req, res) => {
    res.json({
        email: req.user.email,
        username: req.user.username
    })
})

router.get('/users/:id', asyncHandler(async (req, res) => {
    const user = await User.findByPk(parseInt(req.params.id, 10));
    res.send(user)
}))

module.exports = router;