const jwt = require('jsonwebtoken');

class AuthController {
  login(req, res) {
    if (req.cookies) {
      const jwtCookie = req.cookies.jwt

      if (jwtCookie) {
        return res.json({alert: "An token already exists"})
      }
    }

    const userValid = req.body.user == 'João Victor'
    const passValid = req.body.password == '12345'

    if (userValid && passValid) {
      const id = 1;
      const token = jwt.sign({ id }, process.env.SECRET, {
        expiresIn: 600
      })


      res.cookie('jwt', token, { httpOnly: true, maxAge: 30*1000})
      return res.json({auth: true, token: token})
    }

    return res.json({alert: "Dados errados"})

  }

  logout(req, res) {
    res.cookie('jwt', '', { maxAge: 1000 })
    return res.json({ auth: false, token: null });
  }
}

module.exports = AuthController