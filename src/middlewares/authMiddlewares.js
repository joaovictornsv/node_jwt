const jwt = require('jsonwebtoken');

function verifyJWT(req, res, next) {
  if (req.cookies) {
    const token = req.cookies.jwt

    if (!token) {
      return res.status(401).json({ auth: false, message: 'No token provided.' })
    }
  
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if(err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' })
  
      req.userID = decoded.id
      next();
    })
  }
  else {
    return res.status(401).json({ auth: false, message: 'No token provided.' })
  }
}

module.exports = verifyJWT