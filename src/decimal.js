/**
 * Decimal module. Contains all logic and functionality for decimal conversions 
 * to and from any base (binary, octal, decimal and hexadecimal).
 * @module decimal
 */
"use strict";

/**
 * Use bignumber.js library for precise math calculations of big numbers 
 * without losing precision as with typical maths functionality in JavaScript.
 */
const BigNumber = require('bignumber.js');
const {isValEmpty, stripValue} = require('./helper.js');


/**
 * Converts a base to decimal.
 * @param {number} base - Base from which to convert
 * @param {string|number} value - Value to convert
 * @returns {string}
 */
function baseToDec(base, value) {
  if (isValEmpty(base)) return null;
  if (!(value = stripValue(value, isValid))) return null;

 /**
  * Rather than call exponential function repeatedly in iteration, keep 
  * track of current power-of-base and multiply it by base each iteration.
  * This maintains respective power-of-base saving some overhead - starting 
  * from right-most digit, e.g: base^0
  */
  let powOfBase = BigNumber('1'), /**current power-of-base */
      result = BigNumber('0');

  const {HEX_ALPHA_TO_DIGIT} = require('./hex.js');

  /* reverse value order to iterate in the proper order */
  value = value.split('').reverse();
  value.forEach((digit) => {
    if (base == 16) digit = HEX_ALPHA_TO_DIGIT[digit.toLowerCase()];
    result = result.plus((powOfBase).multipliedBy(digit));
    powOfBase = powOfBase.multipliedBy(base);
  });

  return result.toFixed();
}


/**
 * Converts a decimal value to a different base value.
 * Either binary, octal, decimal or hex.
 * @param {number} base - Base from which to convert
 * @param {string|number} value - Value to convert
 * @returns {string}
 */
function toBase(base, value) {
  if (isValEmpty(base)) return null;
  if (!(value = stripValue(value, isValid))) return null;
  if (base == 10) return value;

  let remainList = [], /** List to track remainders from base divisions. */
      ansInt = '', /** Integer result from base division. */
      remain = ''; /** Remainder from the base division. */

  /**
   * Clone a new BigNumber constructor so that it rounds down with 
   * floor function to properly extract integer from the 
   * divisions by base.
   */
  let BN = BigNumber.clone({ ROUNDING_MODE: 3});
  ansInt = BN(value);
  
  /**
   * Continually divide by base and track the remainder in remainList 
   * until the integer portion of the divided result is zero.
   */
  do {
    remain = ansInt.modulo(base);
    ansInt = ansInt.dividedBy(base).integerValue();
    remainList.push(remain);
  } while(ansInt != '0');

  /** If hexadecimal base, convert remainders to hex alphanumerics */
  if (base == 16) {
    const {HEX_DIGIT_TO_ALPHA} = require('./hex.js');
    remainList = remainList.map((x) => {
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
 * @returns {string}
 */
function toBin(value) {
  return toBase(2, value);
}


/**
 * Converts from decimal to decimal. Shortcut 
 * for calling toBase(10, value).
 * @param {string|number} value - Value to convert
 * @returns {string}
 */
function toDec(value) {
  return toBase(10, value);
}


/**
 * Converts from decimal to hexadecimal. Shortcut 
 * for calling toBase(16, value).
 * @param {string|number} value - Value to convert
 * @returns {string}
 */
function toHex(value) {
  return toBase(16, value);
}


/**
 * Converts from decimal to octal. Shortcut 
 * for calling toBase(8, value).
 * @param {string|number} value - Value to convert
 * @returns {string}
 */
function toOct(value) {
  return toBase(8, value);
}


/**
 * Checks if value is a valid decimal number for conversion.
 * @param {string} value - Value to validate
 * @returns {boolean}
 */
function isValid(value) {
  const {isValid} = require('./helper.js');
  return isValid(value, /[^0-9]/g);
}


module.exports = {
  baseToDec,
  isValid,
  toBase,
  toBin,
  toDec,
  toHex,
  toOct
};
