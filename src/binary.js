/**
 * Binary module. Contains all logic and functionality for binary conversions.
 * @module binary
 */
"use strict";

const {isValEmpty, trimLeadingZeroes, stripValue} = require('./helper.js');


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
  const {baseToDec} = require('./decimal.js');
  
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
  
  const {toHex} = require('./decimal.js');

  /* Reverse string value so interpreted from right to left 
   * so they will be broken into 4-bit segments properly. */
  value = value.split('').reverse().join('');

  /* Break value into 4-bit segments */
  let segs = value.match(/.{1,4}/g);

  /*
   * Convert 4-bit segment to decimal value segment. Must be reversed again to 
   * allow toDec function to process properly. Convert the decimal value into 
   * hex value and push into list of converted segments.
   */
  segs = segs.map((seg) => {
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
  
  const {toOct} = require('./decimal.js');

  /* Reverse string value so interpreted from right to left
   * so they will be broken into 3-bit segments properly */
  value = value.split('').reverse().join('');

  /* Break value into 3-bit segments */
  let segs = value.match(/.{1,3}/g);

  /* Convert 3-bit segment to decimal value. Reverse segment 
   * again so toDec function processes properly. Convert the 
   * decimal value into octal value and push into list of 
   * converted segments. */
  segs = segs.map((seg) => {
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
  const {repeat} = require('./helper.js');
  return repeat(bits - value.length, '0') + value;
}


/**
 * Checks if value is a valid binary number for conversion.
 * @param {string} value - Value to validate
 * @returns {boolean} - True if valid. False if invalid.
 */
function isValid(value) {
  const {isValid} = require('./helper.js');
  return isValid(value, /[^0-1]/g);
}


module.exports = {
  isValid,
  toBin,
  toDec,
  toHex,
  toOct,
  padToBits
};
