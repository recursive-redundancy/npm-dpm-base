/**
 * Octal module. Contains all logic and functionality for octal conversions 
 * to and from any base (binary, octal, decimal and hexadecimal).
 * @module octal
 */
"use strict";

// REMOVE THIS
const {trimLeadingZeroes} = require('./helper.js');

const {isValEmpty, stripValue} = require('./helper.js');
const {padToBits} = require('./binary.js');

/* 
* takes an octal number value
* and returns value converted into decimal format (returns as string)
* returns null if binary value is invalid
* args is value to convert to decimal
*/
function toDec(value) {
  if (!isValid(value)) return null;
  if (typeof(value) != "string") value = value.toString();

  const {baseToDec} = require('./decimal.js');

  return baseToDec('8', value);
}


/*
* Takes an octal value
* and converts to binary number value (returns as string)
* arg1 is value to convert
* returns null if invalid value
*/
function toBin(value) {
  if (value == null || value == undefined ||
    !isValid(value)) return null;
  if (typeof(value) != "string") value = value.toString();

  const {toBin} = require('./decimal.js');

  value = trimLeadingZeroes(value);

  // break octal value in single digits
  let digits = value.split('');
  digits = digits.map((digit) => {
    /* convert digit to binary
    *  and padd to 3-bits if necessary */
    return padToBits(3, toBin(digit));
  });

  return trimLeadingZeroes(digits.join(''));
}


/*
* Takes an octal value
* and converts to hex number value (returns as string)
* arg1 is value to convert
* returns null if invalid value
*/
function toHex(value) {
  if (value == null || value == undefined ||
    !isValid(value)) return null;
  if (typeof(value) != "string") value = value.toString();

  const {toHex} = require('./binary.js');

  value = trimLeadingZeroes(value);

  // break value into single digits
  let digits = value.split('');
  digits = digits.map((digit) => {
    /* convert digit to binary value
    *  pad it to 3-bit if needed */
    return padToBits(3, toBin(digit));
  });

  /* assemble list of 3-bit binary values
  *  and convert to a single hex value */
  return trimLeadingZeroes(toHex(digits.join('')));
}


/*
* Converts from octal to octal (returns as string)
* Since converting to and from same base, simply
* return the input value
* arg1 is value to convert
*/
function toOct(value) {
  return value;
}


/**
 * Checks if value is a valid octal number for conversion.
 * @param {string} value - Value to validate.
 * @returns {boolean}
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
