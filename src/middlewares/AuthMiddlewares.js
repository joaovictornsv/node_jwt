const HttpException = require('./HttpException')
const jwt = require('jsonwebtoken');

function verifyJWT(req, res, next) {
  if (req.cookies) {
    const token = req.cookies.jwt

    if (!token) {
      throw new HttpException('No token provided.', 401)
    }
  
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if(err) throw new HttpException('Failed to authenticate token.', 500)

      req.userID = decoded.id
      next();
    })
  }
  else {
    throw new HttpException('No token provided.', 401)
  }
}

module.exports = verifyJWT