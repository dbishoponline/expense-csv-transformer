require('@babel/polyfill')

// 3rd party modules
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
newFilePath
// file paths
const csvFilePath = process.argv[2].toString()
const newFilePath = `${dirname(csvFilePath)}/${parse(csvFilePath).name}_transformed_${Date.now()}.csv`

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

