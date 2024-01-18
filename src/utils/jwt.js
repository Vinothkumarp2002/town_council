const jwt = require('jsonwebtoken');


function generateToken(user) {
  return jwt.sign(user, process.env.JWTKEY, { expiresIn: '1h' });
}

function verifyToken(token) {
  return jwt.verify(token, process.env.JWTKEY);
}

module.exports = { generateToken, verifyToken };