/*
* Decimal module
* contains all logic and functionality for decimal conversions
* to and from any base (especially binary, octal and hexadecimal)
*/
"use strict";

/*
* use bignumber.js library for precise math
* calculations of big numbers
* without losing precision as with
* typical maths functionality in js
*/
const BigNumber = require('bignumber.js');

/*
* Takes other base formats (binary, octal, hex) 
* and converts to decimal format (returns as string)
* returns null if value cannot be converted properly
* arg1 is the base from which to convert
* arg2 is the value to convert
*/
function baseToDecimal(base, value) {
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


/*
* Converts a decimal value to a base value (returns as string)
* i.e base-2 to decimal, base-8 to decimal, base-16 to decimal
* arg1 is the decimal value to convert
* returns null if cannot be converted properly
*/
function toBase(base, value) {
  if (value == null || value == undefined ||
      base == null || base == undefined) return null;
  if (typeof(value) != "string") value = value.toString();
  if (typeof(base) != "string") base = base.toString();
  if (value.length == 0 || base.length == 0) return null;
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
function toBinary(value) {
  return toBase(2, value);
}


/*
* Converts from decimal to decimal (returns as string)
* Since converting to and from same base, simply
* return the input value
* arg1 is value to convert
*/
function toDecimal(value) {
  return value;
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
function toOctal(value) {
  return toBase(8, value);
}


/*
* Checks if value is a valid decimal number for conversion
* return true if valid, false otherwise
* arg1 is value to check
*/
function isValid(value) {
  if (value == null || value == undefined) return false;
  if (typeof(value) != "string") value = value.toString();
  if (value.length == 0) return false;
  
  // allow only digits of 0-9
  if (value.match(/[^0-9]/g)) return false;

  return true;
}


/*
* EXPORTS
*/
module.exports = {
  baseToDecimal,
  isValid,
  toBase,
  toBinary,
  toDecimal,
  toHex,
  toOctal
};
