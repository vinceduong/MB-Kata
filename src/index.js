const express = require('express')
const app = express()
const asyncHandler = require('express-async-handler')

const {
  helloWorld,
  listMagazines,
  listBooks,
  getBook,
  getMagazine,
  listAuthors,
  getAuthorBooks,
} = require('./controller')

app.get('/', asyncHandler(helloWorld))
app.get('/magazines', asyncHandler(listMagazines))
app.get('/books', asyncHandler(listBooks))
app.get('/books/:isbn', asyncHandler(getBook))
app.get('/magazines/:isbn', asyncHandler(getMagazine))
app.get('/authors', asyncHandler(listAuthors))
app.get('/authors/:author/books', asyncHandler(getAuthorBooks))

app.use((error, req, res, next) => {
  res.status(error.status || 500)
  res.json({ message: error.message })
})

app.listen(process.env.PORT || 3000, function () {
  console.log(`Kata app listening on port ${process.env.PORT || 3000}!`)
})