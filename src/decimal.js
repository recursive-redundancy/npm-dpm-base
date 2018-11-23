/**
 * Decimal module. Contains all logic and functionality for decimal conversions 
 * to and from any base (binary, octal, decimal and hexadecimal).
 * @module decimal
 */
"use strict";


/**
 * Use bignumber.js library for precise math calculations of big numbers 
 * without losing precision as with typical maths functionality in js
 */
const BigNumber = require('bignumber.js');
const {isValEmpty, stripValue} = require('./helper.js');


/**
 * Converts a base to decimal format (base-10)
 * @param {string|number} base - Base from which to convert.
 * @param {string|number} value - Value to convert.
 * @returns {string}
 */
function basetoDec(base, value) {
  value = stripValue(value);


  if (value == null || value == undefined ||
      base == null || base == undefined) return null;
  if (typeof(value) != "string") value = value.toString();
  if (typeof(base) != "string") base = base.toString();
  if (value.length == 0 || base.length == 0) return null;

  /* rather than using an exponential function several times while iterating
  * just keep track of current power-of-base and multiply 
  * it by base each iteration to maintain respective power-of-base
  * starting from right-most digit - tracking 
  * the powOfBase starting at 1 (e.g base^0)
  */
  let powOfBase = BigNumber('1'), // current power-of-base
      result = BigNumber('0');

  const {HEX_ALPHA_TO_DIGIT} = require('./hex.js');

  // reverse value order to iterate properly
  value = value.split('').reverse();
  value.forEach((digit) => {
    // check if hex alpha-digit, replace with numeric value if so
    if (base == '16') digit = HEX_ALPHA_TO_DIGIT[digit.toLowerCase()];
    // add product of this digit times base raised to current power to result
    result = result.plus((powOfBase).multipliedBy(digit));
    powOfBase = powOfBase.multipliedBy(base);
  });

  return result.toFixed();
}


/**
 * Converts a decimal value to a different base value.
 * Either binary, octal, decimal or hex.
 * @param {string|number} base - Base from which to convert.
 * @param {string|number} value - Value to convert.
 * @returns {string}
 */
function toBase(base, value) {
  value = stripValue(value, isValid);
  if (!value || isValEmpty(base)) return null;
  if (base == '10') return value;

  let remainList = [], // list to track remainders from base divisions
      ansInt = '', // the integer result from base division
      remain = ''; // the remainder from the base division

  /* 
  * clone a new BigNumber constructor
  * so that it rounds down with floor function
  * to properly extract integer from
  * the divisions by base 
  */
  let BN = BigNumber.clone({ ROUNDING_MODE: 3});
  ansInt = BN(value);
  
  /* 
  * continually divide by base
  * and track the remainder in remainList
  * until the integer portion of the divided result is zero 
  */
  do {
    remain = ansInt.modulo(base);
    ansInt = ansInt.dividedBy(base).integerValue();
    remainList.push(remain);
  } while(ansInt != '0');

  // if hexadecimal base, convert remainders to hex alphanumerics
  if (base == '16') {
    const {HEX_DIGIT_TO_ALPHA} = require('./hex.js');
    remainList = remainList.map((x) => {
      return HEX_DIGIT_TO_ALPHA[x.toString()];
    });
  }

  /* 
  * reverse the list of remainders and
  * assemble into a string representing the
  * converted result value 
  */
  return remainList.reverse().join('');
}


/*
* Converts from decimal to binary (base-2, returns as string)
* shortcut function for toBase(2, value)
* arg1 is value to convert
*/
function toBin(value) {
  return toBase(2, value);
}


/*
* Converts from decimal to decimal (returns as string)
* shortcut function for toBase(10, value)
* arg1 is value to convert
*/
function toDec(value) {
  return toBase(10, value);
}

/*
* Converts from decimal to hexadecimal (base-16, returns as string)
* shortcut function for toBase(16, value)
* arg1 is value to convert
*/
function toHex(value) {
  return toBase(16, value);
}


/*
* Converts from decimal to octal (base-8, returns as string)
* shortcut function for toBase(8, value)
* arg1 is value to convert
*/
function toOct(value) {
  return toBase(8, value);
}


/**
 * Checks if value is a valid decimal number for conversion.
 * @param {string|number} value - Value to validate.
 * @returns {boolean}
 */
function isValid(value) {
  if (isValEmpty(value)) return false;
  
  // allow only digits of 0-9
  if (value.match(/[^0-9]/g)) return false;

  return true;
}


/*
* EXPORTS
*/
module.exports = {
  basetoDec,
  isValid,
  toBase,
  toBin,
  toDec,
  toHex,
  toOct
};
