const TOKEN_SECRET = "9999" // For this purpose. In real production, this will be in ENV and will be more sophisticated number

var jwt = require('jsonwebtoken');

function generateAccessToken(user_name) {
  var token= jwt.sign({userName: user_name}, TOKEN_SECRET, { expiresIn: '1800s' });
	return token;
}

function authenticateToken(req, res, next) {
  var token = req.headers['x-auth-token'];

  if (token) {
    jwt.verify(token, TOKEN_SECRET, function (err, user) {
	    if (err) return res.status(403).json({ status: "NG", result: "Forbidden" });
      req.user = user;
	    next();
	  });

	} else {
    //return res.sendStatus(401);
    return res.status(401).json({ status: "NG", result: "Unauthorized" });
	}
}

module.exports = { generateAccessToken, authenticateToken };
