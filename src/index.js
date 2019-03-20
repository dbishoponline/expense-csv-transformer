const csv = require('csv')
const fs = require('fs')
const path = require('path')


const csvFilePath = process.argv[2]
const newFilePath = path.dirname(csvFilePath) + '/' + path.parse(csvFilePath).name + "_transformed.csv"

fs.createReadStream(csvFilePath)
  .pipe(
    csv.parse())
  .pipe(
    csv.transform((record) => {
      const amount = record[3]
      const type = record[4]

      if(type == 'debit') {

        record[3] = -Math.abs(amount)
      }

      return record
    }))
  .pipe(
    csv.stringify())
  .pipe(fs.createWriteStream(newFilePath, {flags: 'a'}))

