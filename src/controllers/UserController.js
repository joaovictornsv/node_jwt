const db = require('../../db.json')

class UserController {
  index(req, res) {
    return res.status(200).json(db.users)
  }
}

module.exports = UserController