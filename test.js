"use strict";

const assert = require("chai").assert;
const stdout = require('test-console').stdout;
const stderr = require('test-console').stderr;

require('.')({ appdir: __dirname });

describe("console-decor actually works", () => {
  it('decorates console.log', () => {
    const out = stdout.inspectSync(() => {
      console.log('test');
    });
    assert.isTrue(out[0].match(/^\[[0-9:\- ]+\S*] test\n$/).length === 1);
  });
  
  it('decorates console.error', () => {
    const err = stderr.inspectSync(() => {
      console.error('test');
    });
    assert.isTrue(err[0].match(/^\[[0-9:\- ]+\S*] test\n$/).length === 1);
  });
});
