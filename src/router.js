const { Router } = require('express')
const verifyJWT = require('./middlewares/AuthMiddlewares')
const AuthController = require('./controllers/AuthController')
const UserController = require('./controllers/UserController')

const router = Router()

const authController = new AuthController();
const userController = new UserController();

router.get('/', (req, res) => {
  return res.status(200).json({ message: 'Hello World' })
})

router.get('/users', verifyJWT, userController.index)

router.post('/login', authController.login)

router.post('/logout', authController.logout)

module.exports = router