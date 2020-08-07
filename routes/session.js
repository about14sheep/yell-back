const express = require('express');
const { check, validationResult } = require('express-validator');

const asyncHandler = require('./utils');
const UserUts = require('./user-utils');
const { authenticated, generateToken } = require('./security-utils');

const router = express.Router();

const email = check('email')
    .isEmail()
    .withMessage('Must be valid Email')
    .normalizeEmail();

const password = check('password')
    .not().isEmpty()
    .withMessage('Must provide password')

router.put('/', email, password, asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next({ status: 422, errors: errors.array() })
    }
    const { email, password } = req.body;
    const user = await UserUts.findByEmail(email);
    if (!user.isValidPassword(password)) {
        const err = new Error('Login Failed')
        err.status = 401;
        err.title = 'Login failed';
        err.errors = ['Invalid credentials'];
        return next(err)
    }
    const { jti, token } = generateToken(user);
    user.tokenId = jti;
    await user.save()
    res.json({ token, user: user });
}))

router.delete('/', [authenticated], asyncHandler(async (req, res) => {
    req.user.tokenId = null;
    await req.user.save()
    res.json({ message: 'success' })
}))

module.exports = router;