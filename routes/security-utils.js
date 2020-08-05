const bearerToken = require('express-bearer-token');
const jwt = require('jsonwebtoken');
const uuid = require('uuid').v4;

const { jwtConfig: { secret, expiresIn } } = require('../config')