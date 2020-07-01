
const csv = require('csv-parser')
const fs = require('fs')

async function readCSV(fileName) {
  const results = []

  return new Promise((resolve, reject) => {
    try {
      fs.createReadStream(`${__dirname}/../../data/${fileName}`)
        .pipe(csv({ separator: ';' }))
        .on('data', (data) => results.push(data))
        .on('end', () => {
          resolve(results)
        })
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = {
  readCSV
}