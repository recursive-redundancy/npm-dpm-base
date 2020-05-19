/**
 * Octal module. Contains all logic and functionality for octal conversions.
 * @module octal
 */
"use strict";

var _require = require('./helper.js'),
    isValEmpty = _require.isValEmpty,
    stripValue = _require.stripValue,
    trimLeadingZeroes = _require.trimLeadingZeroes;

var _require2 = require('./binary.js'),
    padToBits = _require2.padToBits;
/**
 * Converts octal to binary.
 * @param {string|number} value - Value to convert
 * @returns {string|null} - Octal value converted to binary if supplied 
 * value is valid. Null if invalid value supplied.
 */


function toBin(value) {
  if (!(value = stripValue(value, isValid))) return null;

  var _require3 = require('./decimal.js'),
      toBin = _require3.toBin;
  /* Break octal value in single digits */


  var digits = value.split('');
  digits = digits.map(function (digit) {
    /* Convert digit to binary & pad to 3-bits if necessary */
    return padToBits(3, toBin(digit));
  });
  return trimLeadingZeroes(digits.join(''));
}
/**
 * Converts octal to decimal.
 * @param {string|number} value - Value to convert
 * @returns {string|null} - Octal value converted to decimal if supplied 
 * value is valid. Null if invalid value supplied.
 */


function toDec(value) {
  var _require4 = require('./decimal.js'),
      baseToDec = _require4.baseToDec;

  return baseToDec(8, value, isValid);
}
/**
 * Converts octal to hexadecimal.
 * @param {string|number} value - Value to convert
 * @returns {string|null} - Octal value converted to hexadecimal if supplied 
 * value is valid. Null if invalid value supplied.
 */


function toHex(value) {
  if (!(value = stripValue(value, isValid))) return null;

  var _require5 = require('./binary.js'),
      toHex = _require5.toHex;
  /* Break value into single digits */


  var digits = value.split('');
  digits = digits.map(function (digit) {
    /* Convert digit to binary value
     * & pad it to 3-bit if needed */
    return padToBits(3, toBin(digit));
  });
  /* Assemble list of 3-bit binary values & convert to a single hex value */

  return trimLeadingZeroes(toHex(digits.join('')));
}
/**
 * Converts from octal to octal, so if value is valid 
 * it simply returns the same value.
 * @param {string|number} value - Value to convert
 * @returns {string|null} - Octal value converted to octal (same as initial value) if supplied 
 * value is valid. Null if invalid value supplied.
 */


function toOct(value) {
  if (!(value = stripValue(value, isValid))) return null;
  return value;
}
/**
 * Checks if value is a valid binary number for conversion.
 * @param {string} value - Value to validate
 * @returns {boolean} - True if valid. False if invalid.
 */


function isValid(value) {
  var _require6 = require('./helper.js'),
      isValid = _require6.isValid;

  return isValid(value, /[^0-7]/g);
}

module.exports = {
  isValid: isValid,
  toBin: toBin,
  toDec: toDec,
  toHex: toHex,
  toOct: toOct
};