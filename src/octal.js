/**
 * Octal module. Contains all logic and functionality for octal conversions.
 * @module octal
 */
"use strict";

const {isValEmpty, stripValue, trimLeadingZeroes} = require('./helper.js');
const {padToBits} = require('./binary.js');


/**
 * Converts octal to binary.
 * @param {string|number} value - Value to convert
 * @returns {string|null} - Octal value converted to binary if supplied 
 * value is valid. Null if invalid value supplied.
 */
function toBin(value) {
  if (!(value = stripValue(value, isValid))) return null;

  const {toBin} = require('./decimal.js');

  /* Break octal value in single digits */
  let digits = value.split('');
  digits = digits.map((digit) => {
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
  const {baseToDec} = require('./decimal.js');

  return baseToDec(8, value, isValid);
}


/**
 * Converts octal to binary.
 * @param {string|number} value - Value to convert
 * @returns {string|null} - Octal value converted to hexadecimal if supplied 
 * value is valid. Null if invalid value supplied.
 */
function toHex(value) {
  if (!(value = stripValue(value, isValid))) return null;

  const {toHex} = require('./binary.js');

  /* Break value into single digits */
  let digits = value.split('');
  digits = digits.map((digit) => {
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
  const {isValid} = require('./helper.js');
  return isValid(value, /[^0-7]/g);
}


module.exports = {
  isValid,
  toBin,
  toDec,
  toHex,
  toOct
};
