const createError = require('http-errors')

async function helloWorld(req, res, next) {
  res.send('Hello World')
}

async function error(req, res, next) {
  throw createError('400', 'An error occured')
}

module.exports = {
  helloWorld,
  error,
}