"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.capitalize = void 0;

var capitalize = function capitalize(s) {
  if (typeof s !== 'string') return s;
  return s.charAt(0).toUpperCase() + s.slice(1);
};

exports.capitalize = capitalize;
var _default = {
  capitalize: capitalize
};
exports.default = _default;