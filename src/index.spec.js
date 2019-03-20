require("@babel/register")
require("@babel/polyfill")

import test from "ava"
import sinon from "sinon"

// before running test
test.beforeEach(t => {
  t.context.log = console.log

  console.log = sinon.spy()
})

// after running test
test.afterEach(t => {
  console.log = t.context.log
})

test('will log true', t => {
  t.true(true);
})
