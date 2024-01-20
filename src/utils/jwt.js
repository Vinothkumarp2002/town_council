const jwt = require('jsonwebtoken');


function generateToken(user) {
  return jwt.sign(user, 'townVi', { expiresIn: '1h' });
}

function verifyToken(token) {
  return jwt.verify(token, 'townVi');
}

module.exports = { generateToken, verifyToken };