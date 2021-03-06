/**
 * Decimal module. Contains all logic and functionality for decimal conversions.
 * @module decimal
 */
"use strict";
/**
 * Use bignumber.js library for precise math calculations of big numbers 
 * without losing precision as with typical maths functionality in JavaScript.
 */

var BigNumber = require('bignumber.js');

var _require = require('./helper.js'),
    isValEmpty = _require.isValEmpty,
    stripValue = _require.stripValue;
/**
 * Converts a base to decimal.
 * @param {number} base - Base from which to convert
 * @param {string|number} value - Value to convert
 * @param {function} validator - A function to validate input value. Since 
 * baseToDec function converts from all bases, it requires a function 
 * to validate input value properly.
 * @returns {string|null} - Base value converted to decimal if supplied 
 * value is valid. Null if invalid value supplied.
 */


function baseToDec(base, value, validator) {
  if (isValEmpty(base)) return null;
  if (!(value = stripValue(value, validator))) return null;
  /* Rather than call exponential function repeatedly in iteration, keep 
   * track of current power-of-base and multiply it by base each iteration.
   * This maintains respective power-of-base saving some overhead - starting 
   * from right-most digit, e.g: base^0 */

  var powOfBase = BigNumber('1'),

  /**current power-of-base */
  result = BigNumber('0');

  var _require2 = require('./hex.js'),
      HEX_ALPHA_TO_DIGIT = _require2.HEX_ALPHA_TO_DIGIT;
  /* Reverse value order to iterate in the proper order */


  value = value.split('').reverse();
  value.forEach(function (digit) {
    if (base == 16) digit = HEX_ALPHA_TO_DIGIT[digit.toLowerCase()];
    result = result.plus(powOfBase.multipliedBy(digit));
    powOfBase = powOfBase.multipliedBy(base);
  });
  return result.toFixed();
}
/**
 * Converts a decimal value to a different base value.
 * Either binary, octal, decimal or hex.
 * @param {number} base - Base from which to convert
 * @param {string|number} value - Value to convert
 * @returns {string|null} - Decimal value converted to base if supplied 
 * value is valid. Null if invalid value supplied.
 */


function toBase(base, value) {
  if (isValEmpty(base)) return null;
  if (!(value = stripValue(value, isValid))) return null;
  if (base == 10) return value;
  var remainList = [],

  /** List to track remainders from base divisions. */
  ansInt = '',

  /** Integer result from base division. */
  remain = '';
  /** Remainder from the base division. */

  /**
   * Clone a new BigNumber constructor so that it rounds down with 
   * floor function to properly extract integer from the 
   * divisions by base.
   */

  var BN = BigNumber.clone({
    ROUNDING_MODE: 3
  });
  ansInt = BN(value);
  /* Continually divide by base and track the remainder in remainList 
   * until the integer portion of the divided result is zero */

  do {
    remain = ansInt.modulo(base);
    ansInt = ansInt.dividedBy(base).integerValue();
    remainList.push(remain);
  } while (ansInt != '0');
  /** If hexadecimal base, convert remainders to hex alphanumerics */


  if (base == 16) {
    var _require3 = require('./hex.js'),
        HEX_DIGIT_TO_ALPHA = _require3.HEX_DIGIT_TO_ALPHA;

    remainList = remainList.map(function (x) {
      return HEX_DIGIT_TO_ALPHA[x.toString()];
    });
  }
  /** List of remainders must be reversed to be formatted in correct order */


  return remainList.reverse().join('');
}
/**
 * Converts from decimal to binary. Shortcut 
 * for calling toBase(2, value).
 * @param {string|number} value - Value to convert
 * @returns {string|null} - Decimal value converted to binary if supplied 
 * value is valid. Null if invalid value supplied.
 */


function toBin(value) {
  return toBase(2, value);
}
/**
 * Converts from decimal to decimal. Shortcut 
 * for calling toBase(10, value).
 * @param {string|number} value - Value to convert
 * @returns {string|null} - Decimal value converted to decimal (same as 
 * initial value) if supplied value is valid. Null if invalid value supplied.
 */


function toDec(value) {
  return toBase(10, value);
}
/**
 * Converts from decimal to hexadecimal. Shortcut 
 * for calling toBase(16, value).
 * @param {string|number} value - Value to convert
 * @returns {string|null} - Decimal value converted to hexadecimal if supplied 
 * value is valid. Null if invalid value supplied.
 */


function toHex(value) {
  return toBase(16, value);
}
/**
 * Converts from decimal to octal. Shortcut 
 * for calling toBase(8, value).
 * @param {string|number} value - Value to convert
 * @returns {string|null} - Decimal value converted to octal if supplied 
 * value is valid. Null if invalid value supplied.
 */


function toOct(value) {
  return toBase(8, value);
}
/**
 * Checks if value is a valid binary number for conversion.
 * @param {string} value - Value to validate
 * @returns {boolean} - True if valid. False if invalid.
 */


function isValid(value) {
  var _require4 = require('./helper.js'),
      isValid = _require4.isValid;

  return isValid(value, /[^0-9]/g);
}

module.exports = {
  baseToDec: baseToDec,
  isValid: isValid,
  toBase: toBase,
  toBin: toBin,
  toDec: toDec,
  toHex: toHex,
  toOct: toOct
};