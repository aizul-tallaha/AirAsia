const jwt = require('jsonwebtoken');
const TOKEN_SECRET = "9999" // For this purpose. In real production, this will be in ENV and will be more sophisticated number

function generateAccessToken(user_name) {
  var token= jwt.sign({userName: user_name}, TOKEN_SECRET, { expiresIn: '1800s' });
	return token;
}

module.exports = { generateAccessToken };
