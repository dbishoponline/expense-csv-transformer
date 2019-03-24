import { pipe, allPass, has, isEmpty, isNil } from 'ramda'
import { capitalize } from './helpers'

// TODO: add more validation
const Record = record => {
  if(!allPass([true, true])) {
    throw new Error(`CSV columns are not valid.`)

    return record
  }

  return record
}

export const headerRecord = record => {
  record.splice(4, 0, 'Amount Credit', 'Amount Debit')

  return record
}

export const bodyRecord = record => {
  const date = record[0]
  const description = record[2]
  const amount = record[3]
  const type = record[4]
  const category = record[5]
  const labels = record[7]
  const notes = record[8]

  if(!isNil(process.argv[3]) && process.argv[3] !== date.split('/').pop()) {
    return null
  }

  return pipe(
    transformDescription({ description, category, labels, notes, }),
    transformAmounts({ amount, type, })
  )(record)
}

export const reducePropsIntoDescription = (acc, key, index, src) =>
  isEmpty(key[1]) || isNil(key[1])
    ? acc
    : `${acc} ||| ${capitalize(key[0])}: ${key[1]}`

export const transformDescription = orig => record => {

  // flag to combine category, labels, notes into description
  // if(process.argv[3] === '-c'){
    let props = {
      ...orig
    }
    delete props.description
    let newStr = Object.entries(props)
      .reduce(reducePropsIntoDescription, orig.description)

    record[2] = `${newStr} ||| From: Mint`
  // }

  return record
}

export const transformAmounts = orig => record => {
  const { amount, type } = orig
  let newAmount = null

  record.splice(4, 0, '', '')

  if(type == 'credit') {
    record[4] = Number(amount).toFixed(2)
  }

  // looks for debit transactions and converts the amount to a negative number
  if(type == 'debit') {

    newAmount = -Math.abs(amount)
    record[5] = Number(newAmount).toFixed(2)
  }

  record[3] = Number(amount).toFixed(2)

  return record
}

const splitByYear = () =>
  !debug
    ? fs.createWriteStream(newFilePath, {flags: 'a'})
    : process.stdout

let count = 0

export const transform = record => {
  let newRecord = !count
    ? headerRecord(Record(record))
    : bodyRecord(Record(record))

  count++

  return newRecord
}

export default {
  transform,
  splitByYear,
}
