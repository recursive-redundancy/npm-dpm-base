/**
 * Hexadecimal module. Contains all logic and functionality for hexadecimal conversions.
 * @module hexadecimal
 */
"use strict";

const {isValEmpty, stripValue, trimLeadingZeroes} = require('./helper.js');

/** Key for converting hex alphanumeric digits to numerals. */
const HEX_ALPHA_TO_DIGIT = {
  '0': '0',
  '1': '1',
  '2': '2',
  '3': '3',
  '4': '4',
  '5': '5',
  '6': '6',
  '7': '7',
  '8': '8',
  '9': '9',
  'a': '10',
  'b': '11',
  'c': '12',
  'd': '13',
  'e': '14',
  'f': '15'
}

/** Key for converting numeral digits to hex alphanumeric. */
const HEX_DIGIT_TO_ALPHA = {
  '0': '0',
  '1': '1',
  '2': '2',
  '3': '3',
  '4': '4',
  '5': '5',
  '6': '6',
  '7': '7',
  '8': '8',
  '9': '9',
  '10': 'a',
  '11': 'b',
  '12': 'c',
  '13': 'd',
  '14': 'e',
  '15': 'f'
}


/**
 * Converts hexadecimal to binary.
 * @param {string|number} value - Value to convert
 * @returns {string|null} - Hexadecimal value converted to binary if supplied 
 * value is valid. Null if invalid value supplied.
 */
function toBin(value) {
  if (!(value = stripValue(value, isValid))) return null;
  
  const {toBin} = require('./decimal.js');
  const {padToBits} = require('./binary.js');

  /* Break hex value into single digits */
  let digits = value.split('');
  
  digits = digits.map((digit) => {
    /* Convert hex digit to decimal value and convert 
     * the decimal value into binary value. Pad binary 
     * value to 4-bit if needed. */
    return padToBits(4, toBin(toDec(digit)));
  });

  return trimLeadingZeroes(digits.join(''));
}


/**
 * Converts hexadecimal to decimal.
 * @param {string|number} value - Value to convert
 * @returns {string|null} - Hexadecimal value converted to decimal if supplied 
 * value is valid. Null if invalid value supplied.
 */
function toDec(value) {
  const {baseToDec} = require('./decimal');

  return baseToDec(16, value, isValid);
};


/**
 * Converts from hexadecimal to hexadecimal, so if value is valid 
 * it simply returns the same value.
 * @param {string|number} value - Value to convert
 * @returns {string|null} - Hexadecimal value converted to Hexadecimal (same as 
 * initial value) if supplied value is valid. Null if invalid value supplied.
 */
function toHex(value) {
  if (!(value = stripValue(value, isValid))) return null;
  return value;
}


/**
 * Converts hexadecimal to octal.
 * @param {string|number} value - Value to convert
 * @returns {string|null} - Hexadecimal value converted to octal if supplied 
 * value is valid. Null if invalid value supplied.
 */
function toOct(value) {
  if (!(value = stripValue(value, isValid))) return null;

  const {toOct} = require('./binary.js');

  /* Convert hex to binary then convert the binary to octal 
   * and trim any leading zeroes */
  return trimLeadingZeroes(toOct(toBin(value)));
}


/**
 * Checks if value is a valid hexadecimal number for conversion.
 * @param {string} value - Value to validate
 * @returns {boolean} - True if valid. False if invalid.
 */
function isValid(value) {
  const {isValid} = require('./helper.js');
  return isValid(value, /[^0-9a-f]/gi);
}


module.exports = {
  HEX_ALPHA_TO_DIGIT,
  HEX_DIGIT_TO_ALPHA,
  isValid,
  toBin,
  toDec,
  toHex,
  toOct
};

