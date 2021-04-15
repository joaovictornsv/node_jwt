const jwt = require('jsonwebtoken');
const HttpException = require('../middlewares/HttpException');

class AuthController {
  login(req, res) {
    if (req.cookies) {
      const jwtCookie = req.cookies.jwt

      if (jwtCookie) {
        throw new HttpException("An token already exists")
      }
    }

    const userValid = req.body.user == 'João Victor'
    const passValid = req.body.password == '12345'

    if (userValid && passValid) {
      const id = 1;
      const token = jwt.sign({ id }, process.env.SECRET, {
        expiresIn: 60
      })


      res.cookie('jwt', token, { httpOnly: true, maxAge: 60*1000})
      return res.json({auth: true, token: token})
    }

    throw new HttpException("Your access credentials are invalid")

  }

  logout(req, res) {
    res.cookie('jwt', '', { maxAge: 1000 })
    return res.json({ auth: false, token: null });
  }
}

module.exports = AuthController