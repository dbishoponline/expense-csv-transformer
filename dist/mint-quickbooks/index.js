"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.transform = exports.transformAmounts = exports.transformDescription = exports.reducePropsIntoDescription = exports.bodyRecord = exports.headerRecord = void 0;

var _ramda = require("ramda");

var _helpers = require("./helpers");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// TODO: add more validation
var Record = function Record(record) {
  if (!(0, _ramda.allPass)([true, true])) {
    throw new Error("CSV columns are not valid.");
    return record;
  }

  return record;
};

var headerRecord = function headerRecord(record) {
  record.splice(4, 0, 'Amount Credit', 'Amount Debit');
  return record;
};

exports.headerRecord = headerRecord;

var bodyRecord = function bodyRecord(record) {
  var date = record[0];
  var description = record[2];
  var amount = record[3];
  var type = record[4];
  var category = record[5];
  var labels = record[7];
  var notes = record[8];

  if (!(0, _ramda.isNil)(process.argv[3]) && process.argv[3] !== date.split('/').pop()) {
    return null;
  }

  return (0, _ramda.pipe)(transformDescription({
    description: description,
    category: category,
    labels: labels,
    notes: notes
  }), transformAmounts({
    amount: amount,
    type: type
  }))(record);
};

exports.bodyRecord = bodyRecord;

var reducePropsIntoDescription = function reducePropsIntoDescription(acc, key, index, src) {
  return (0, _ramda.isEmpty)(key[1]) || (0, _ramda.isNil)(key[1]) ? acc : "".concat(acc, " ||| ").concat((0, _helpers.capitalize)(key[0]), ": ").concat(key[1]);
};

exports.reducePropsIntoDescription = reducePropsIntoDescription;

var transformDescription = function transformDescription(orig) {
  return function (record) {
    // flag to combine category, labels, notes into description
    // if(process.argv[3] === '-c'){
    var props = _objectSpread({}, orig);

    delete props.description;
    var newStr = Object.entries(props).reduce(reducePropsIntoDescription, orig.description);
    record[2] = "".concat(newStr, " ||| From: Mint"); // }

    return record;
  };
};

exports.transformDescription = transformDescription;

var transformAmounts = function transformAmounts(orig) {
  return function (record) {
    var amount = orig.amount,
        type = orig.type;
    var newAmount = null;
    record.splice(4, 0, '', '');

    if (type == 'credit') {
      record[4] = Number(amount).toFixed(2);
    } // looks for debit transactions and converts the amount to a negative number


    if (type == 'debit') {
      newAmount = -Math.abs(amount);
      record[5] = Number(newAmount).toFixed(2);
    }

    record[3] = Number(amount).toFixed(2);
    return record;
  };
};

exports.transformAmounts = transformAmounts;

var splitByYear = function splitByYear() {
  return !debug ? fs.createWriteStream(newFilePath, {
    flags: 'a'
  }) : process.stdout;
};

var count = 0;

var transform = function transform(record) {
  var newRecord = !count ? headerRecord(Record(record)) : bodyRecord(Record(record));
  count++;
  return newRecord;
};

exports.transform = transform;
var _default = {
  transform: transform,
  splitByYear: splitByYear
};
exports.default = _default;