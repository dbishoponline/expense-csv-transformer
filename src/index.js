const csv = require('csv')
const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const R = require('ramda')

const log = console.log
const logSuccess = x => log(chalk.green(x))

const csvFilePath = process.argv[2]
const newFilePath = `${path.dirname(csvFilePath)}/${path.parse(csvFilePath).name}_transformed_${Date.now()}.csv`

let count = 0
const debug = false

const headerRecord = record => {
  record.splice(4, 0, 'Amount Credit', 'Amount Debit')

  return record
}

const bodyRecord = record => {
  let amount = record[3]
  let type = record[4]

  record
    .splice(4, 0, '', '')

  if(type == 'credit') {
    record[4] = Number(amount).toFixed(2)
  }

  // looks for debit transactions and converts the amount to a negative number
  if(type == 'debit') {

    amount = -Math.abs(amount)
    record[5] = Number(amount).toFixed(2)
  }

  record[3] = Number(amount).toFixed(2)

  return record
}

fs.createReadStream(csvFilePath)
  .pipe(
    csv.parse())
  .pipe(
    csv.transform(record => {

      let newRecord = !count
        ? headerRecord(record)
        : bodyRecord(record)

      count++

      return newRecord
    }))
  .pipe(
    csv.stringify())
  .pipe(
    !debug
      ? fs.createWriteStream(newFilePath, {flags: 'a'})
      : process.stdout)


logSuccess(`CSV Transformation Complete!`)
logSuccess(newFilePath)

