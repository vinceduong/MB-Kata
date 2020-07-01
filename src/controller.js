const createError = require('http-errors')
const { readCSV } = require('./utils/readCSV')
const { keyBy } = require('lodash')

let books = null
let magazines = null
let authors = null
let booksByISBN = null
let magazinesByISBN = null
let booksByAuthor = null

async function getCSVdata() {
  books = await readCSV('books.csv')
  authors = await readCSV('authors.csv')
  magazines = await readCSV('magazines.csv')

  booksByISBN = keyBy(books, 'isbn')
  magazinesByISBN = keyBy(magazines, 'isbn')
  booksByAuthor = books.reduce((acc, book) => {
    const { authors } = book

    authors.split(',').forEach((author) => {
      if (!acc[author]) {
        acc[author] = []
      }

      acc[author].push(book)
    })

    return acc
  }, {})
}

getCSVdata()

async function helloWorld(req, res, next) {
  res.send('Hello World')
}

async function listMagazines(req, res, next) {
  res.send(magazines)
}

async function listBooks(req, res, next) {
  res.send(books)
}

async function getBook(req, res, next) {
  const { isbn } = req.params
  
  const book = booksByISBN[isbn]

  if (!book) {
    res.status(404)
    res.send({ error: 'Book not found'})
  }

  res.send(book)
}

async function getMagazine(req, res, next) {
  const { isbn } = req.params

  const magazine = magazinesByISBN[isbn]

  if (!magazine) {
    res.status(404)
    res.send({ error: 'Magazine not found'})
  }

  res.send(magazine)
}

async function listAuthors(req, res, next) {
  res.send(authors)
}

async function getAuthorBooks(req, res, next) {
  const { author } = req.params

  const books = booksByAuthor[author]

  if(!books) {
    res.status(404)
    res.send({ error: 'No books found for this author'})
  }

  res.send(books)
}

module.exports = {
  helloWorld,
  listMagazines,
  listBooks,
  getBook,
  getMagazine,
  listAuthors,
  getAuthorBooks
}