require('dotenv-safe').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const router = require('./router')
const MiddlewareException = require('./middlewares/MiddlewareException')

const app = express();

app.use(express.json());
app.use(cookieParser())
app.use(router)
app.use(MiddlewareException)

app.listen(3000, () => console.log('Server is running on port 3000'))