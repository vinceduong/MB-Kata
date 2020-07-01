const express = require('express')
const app = express()
const asyncHandler = require('express-async-handler')

const {
  helloWorld,
  error,
} = require('./controller')

app.get('/', asyncHandler(helloWorld))
app.get('/error', asyncHandler(error))

app.use((err, req, res, next) => {
  console.log({ error })
  console.log('Error status: ', error.status || 500)
  console.log('Message: ', error.message)
})

app.use((error, req, res, next) => {
  res.status(error.status || 500)
  res.json({ message: 'error' })
})

app.listen(process.env.PORT || 3000, function () {
  console.log(`Example app listening on port ${process.env.PORT || 3000}!`)
})