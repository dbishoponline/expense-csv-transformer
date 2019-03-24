require('@babel/polyfill')

// 3rd party modules
import { isNil } from 'ramda'
import csv from 'csv'
import fs from 'fs'
import { dirname, parse } from 'path'
import chalk from 'chalk'

// local modules
import { transform } from './mint-quickbooks'

// logging
const debug = false
const log = console.log
const logSuccess = x => log(chalk.green(x))
const logError = x => log(chalk.red(x))

const init = () =>
  isNil(process.argv[2])
    ? logError(`Error: did not specify a CSV file. \n\nTry running: \n"mintx path/to/transactions.csv -c"`)
    : runAction()

const runAction = () => {

  // file paths
  const csvFilePath = process.argv[2].toString()
  const newFilePath = createFilenamePathCSV(csvFilePath)

  fs.createReadStream(csvFilePath)
    .pipe(
      csv.parse())
    .pipe(
      csv.transform(transform))
    .pipe(
      csv.stringify())
    .pipe(
      !debug
        ? fs.createWriteStream(newFilePath, {flags: 'a'})
        : process.stdout)

  logSuccess(`CSV Transformation Complete!`)
  logSuccess(newFilePath)
}

const createFilenamePathCSV = (csvFilePath) =>
  isNil(process.argv[3])
    ? `${dirname(csvFilePath)}/${parse(csvFilePath).name}_transformed_${Date.now()}.csv`
    : `${dirname(csvFilePath)}/${parse(csvFilePath).name}_transformed_${process.argv[3]}_${Date.now()}.csv`

// initialize the csv transform script
init()
