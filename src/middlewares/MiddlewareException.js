const HttpException = require('./HttpException')

function MiddlewareException(err, req, res, next) {
  if (err instanceof HttpException) {
    return res.status(err.status)
      .json({
        status: 'error',
        message: err.message
      })
  }

  return res.status(400)
    .json({
      status: 'error',
      message: 'Internal Server Error'
    })
}

module.exports = MiddlewareException