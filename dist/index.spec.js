"use strict";

var _ava = _interopRequireDefault(require("ava"));

var _sinon = _interopRequireDefault(require("sinon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require("@babel/register");

require("@babel/polyfill");

// before running test
_ava.default.beforeEach(function (t) {
  t.context.log = console.log;
  console.log = _sinon.default.spy();
}); // after running test


_ava.default.afterEach(function (t) {
  console.log = t.context.log;
});

(0, _ava.default)('will log true', function (t) {
  t.true(true);
});