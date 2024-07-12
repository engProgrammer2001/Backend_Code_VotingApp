
const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY

const generateToken = (userId) => {
    const token = jwt.sign({ userId: userId }, SECRET_KEY, { expiresIn: '98h' });
    return token;
};

module.exports = generateToken;