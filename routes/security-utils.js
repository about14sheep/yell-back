const bearerToken = require('express-bearer-token');
const jwt = require('jsonwebtoken');
const uuid = require('uuid').v4;

const jwtConfig = { secret: 'thecoldsalad', expiresIn: '10h' }
const UserUts = require('./user-utils');

const generateToken = user => {
    const data = {
        username: user.username,
    };
    const jwtid = uuid();
    return {
        jti: jwtid,
        token: jwt.sign({ data }, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn, jwtid })
    }
}

const restoreUser = (req, res, next) => {
    const { token } = req;

    if (!token) {
        return next({ status: 401, message: 'no token' });
    }

    return jwt.verify(token, jwtConfig.secret, null, async (err, payload) => {
        if (err) {
            err.status = 403;
            return next(err);
        }

        const tokenId = payload.jti;

        try {
            req.user = await UserUts.findByTokenId(tokenId);
        } catch (e) {
            return next(e)
        }

        if (!req.user.isValid()) {
            return next({ status: 404, message: 'session not found' });
        }

        next();
    })
}

const authenticated = [bearerToken(), restoreUser];

module.exports = {
    authenticated,
    generateToken
}