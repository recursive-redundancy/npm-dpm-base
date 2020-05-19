/**
 * Binary module. Contains all logic and functionality for binary conversions.
 * @module binary
 */
"use strict";

var _require = require('./helper.js'),
    isValEmpty = _require.isValEmpty,
    trimLeadingZeroes = _require.trimLeadingZeroes,
    stripValue = _require.stripValue;
/**
 * Converts from binary to binary, so if value is valid 
 * it simply returns the same value.
 * @param {string|number} value - Value to convert
 * @returns {string|null} - Binary value converted to binary (same as 
 * initial value) if supplied value is valid. Null if invalid value supplied.
 */


function toBin(value) {
  if (!(value = stripValue(value, isValid))) return null;
  return value;
}
/**
 * Converts binary to decimal.
 * @param {string|number} value - Value to convert
 * @returns {string|null} - Binary value converted to decimal if supplied 
 * value is valid. Null if invalid value supplied.
 */


function toDec(value) {
  var _require2 = require('./decimal.js'),
      baseToDec = _require2.baseToDec;

  return baseToDec(2, value, isValid);
}
/**
 * Converts binary to hexadecimal.
 * @param {string|number} value - Value to convert 
 * @returns {string|null} - Binary value converted to hexadecimal if supplied 
 * value is valid. Null if invalid value supplied.
 */


function toHex(value) {
  if (!(value = stripValue(value, isValid))) return null;

  var _require3 = require('./decimal.js'),
      toHex = _require3.toHex;
  /* Reverse string value so interpreted from right to left 
   * so they will be broken into 4-bit segments properly. */


  value = value.split('').reverse().join('');
  /* Break value into 4-bit segments */

  var segs = value.match(/.{1,4}/g);
  /*
   * Convert 4-bit segment to decimal value segment. Must be reversed again to 
   * allow toDec function to process properly. Convert the decimal value into 
   * hex value and push into list of converted segments.
   */

  segs = segs.map(function (seg) {
    return toHex(toDec(seg.split('').reverse().join('')));
  });
  /* 
   * reverse list of hex conversions to put back in proper order 
   * then reassemble into a string result */

  return trimLeadingZeroes(segs.reverse().join(''));
}
/**
 * Converts binary to octal.
 * @param {string|number} value - Value to convert 
 * @returns {string|null} - Binary value converted to octal if supplied 
 * value is valid. Null if invalid value supplied.
 */


function toOct(value) {
  if (!(value = stripValue(value, isValid))) return null;

  var _require4 = require('./decimal.js'),
      toOct = _require4.toOct;
  /* Reverse string value so interpreted from right to left
   * so they will be broken into 3-bit segments properly */


  value = value.split('').reverse().join('');
  /* Break value into 3-bit segments */

  var segs = value.match(/.{1,3}/g);
  /* Convert 3-bit segment to decimal value. Reverse segment 
   * again so toDec function processes properly. Convert the 
   * decimal value into octal value and push into list of 
   * converted segments. */

  segs = segs.map(function (seg) {
    return toOct(toDec(seg.split('').reverse().join('')));
  });
  /* Reverse list of octal conversions to put back in proper 
   * order and then reassemble into a string result. */

  return trimLeadingZeroes(segs.reverse().join(''));
}
/**
 * Takes a binary value and pads front with zeroes (if necessary) to 
 * make value into the desired bit-length.
 * @param {number} bits - Desired bit-length 
 * @param {string|number} value - Value to pad
 * @returns {string} - Value padded to desired bit-length.
 */


function padToBits(bits, value) {
  var _require5 = require('./helper.js'),
      repeat = _require5.repeat;

  return repeat(bits - value.length, '0') + value;
}
/**
 * Checks if value is a valid binary number for conversion.
 * @param {string} value - Value to validate
 * @returns {boolean} - True if valid. False if invalid.
 */


function isValid(value) {
  var _require6 = require('./helper.js'),
      isValid = _require6.isValid;

  return isValid(value, /[^0-1]/g);
}

module.exports = {
  isValid: isValid,
  toBin: toBin,
  toDec: toDec,
  toHex: toHex,
  toOct: toOct,
  padToBits: padToBits
};