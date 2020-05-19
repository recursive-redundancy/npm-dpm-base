"use strict";

var binary = require('./binary.js');

var decimal = require('./decimal.js');

var hex = require('./hex.js');

var octal = require('./octal.js');

module.exports = {
  binary: binary,
  decimal: decimal,
  hex: hex,
  octal: octal
};