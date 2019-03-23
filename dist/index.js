"use strict";

var _csv = _interopRequireDefault(require("csv"));

var _fs = _interopRequireDefault(require("fs"));

var _path = require("path");

var _chalk = _interopRequireDefault(require("chalk"));

var _mintQuickbooks = require("./mint-quickbooks");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('@babel/polyfill'); // 3rd party modules


// logging
var debug = false;
var log = console.log;

var logSuccess = function logSuccess(x) {
  return log(_chalk.default.green(x));
};

newFilePath; // file paths

var csvFilePath = process.argv[2].toString();
var newFilePath = "".concat((0, _path.dirname)(csvFilePath), "/").concat((0, _path.parse)(csvFilePath).name, "_transformed_").concat(Date.now(), ".csv");

_fs.default.createReadStream(csvFilePath).pipe(_csv.default.parse()).pipe(_csv.default.transform(_mintQuickbooks.transform)).pipe(_csv.default.stringify()).pipe(!debug ? _fs.default.createWriteStream(newFilePath, {
  flags: 'a'
}) : process.stdout);

logSuccess("CSV Transformation Complete!");
logSuccess(newFilePath);