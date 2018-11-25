/**
 * Hexadecimal module. Contains all logic and functionality for hexadecimal conversions.
 * @module hexadecimal
 */
"use strict";

const {isValEmpty, stripValue} = require('./helper.js');

// REMOVE THIS
const {trimLeadingZeroes} = require('./helper.js');

// key for converting hex alphanumerics to numerals
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

// key for converting numerals to hex alphanumerics
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

/* 
* takes a hex number value
* and returns value converted into decimal format (returns as string)
* returns null if value is invalid
* args is value to convert to decimal
*/
function toDec(value) {
  if (!isValid(value)) return null;
  if (typeof(value) != "string") value = value.toString();

  const {baseToDec} = require('./decimal');

  return baseToDec('16', value);
};


/*
* Takes a hex value
* and converts to binary number value (returns as string)
* arg1 is value to convert
* returns null if invalid value
*/
function toBin(value) {
  if (value == null || value == undefined ||
    !isValid(value)) return null;
  if (typeof(value) != "string") value = value.toString();
  
  const {toBin} = require('./decimal.js');
  const {padToBits} = require('./binary.js');

  value = trimLeadingZeroes(value);

  // break hex value into single digits
  let digits = value.split('');
  
  digits = digits.map((digit) => {
    /* convert hex digit to decimal value
    *  and convert the decimal value into binary value
    *  pad binary value to 4-bit if needed */
    return padToBits(4, toBin(toDec(digit)));
  });

  return trimLeadingZeroes(digits.join(''));
}


/*
* Converts from hex to hex (returns as string)
* Since converting to and from same base, simply
* return the input value
* arg1 is value to convert
*/
function toHex(value) {
  return value;
}


/*
* Takes a hex value
* and converts to octal number value (returns as string)
* arg1 is value to convert
* returns null if invalid value
*/
function toOct(value) {
  if (value == null || value == undefined ||
    !isValid(value)) return null;
  if (typeof(value) != "string") value = value.toString();

  const {toOct} = require('./binary.js');

  /* 
  * convert hex to binary
  * then convert the binary to octal
  * and trim any leading zeroes
  */
  return trimLeadingZeroes(toOct(toBin(value)));
}


/**
 * Checks if value is a valid binary number for conversion.
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

