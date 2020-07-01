const csv = require('csvtojson')

const converter = csv()

async function readCSV(filePath){
  const jsonData = await converter.fromFile(filePath)

  return jsonData
}

module.exports = {
  readCSV
}