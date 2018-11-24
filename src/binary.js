/**
 * Binary module. Contains all logic and functionality for binary conversions.
 * @module binary
 */
"use strict";

const {isValEmpty, stripValue} = require('./helper.js');


/**
 * Converts binary to Decimal
 * @param {string|number} value = Value to convert. 
 * @returns {string}
 */
function toDec(value) {
  if (!(value = stripValue(value, isValid))) return null;

  const {baseToDec} = require('./decimal.js');
  return baseToDec(2, value);
}


/**
 * Converts from binary to binary, so if value is valid 
 * it simply returns the same value.
 * @param {string|number} value - Value to convert.
 * @returns {string}
 */
function toBin(value) {
  if (!(value = stripValue(value, isValid))) return null;
  return value;
}


/*
* Takes a binary value
* and converts to hex number value (returns as string)
* arg1 is value to convert
* returns null if invalid value
*/
function toHex(value) {
  if (value == null || value == undefined ||
    !isValid(value)) return null;
  if (typeof(value) != "string") value = value.toString();
  
  const {toHex} = require('./decimal.js');

  value = trimLeadingZeroes(value);

  /*reverse string value so interpreted from right to left
  * so they will be broken into 4-bit segments properly */
  value = value.split('').reverse().join('');

  // break value into 4-bit segments
  let segs = value.match(/.{1,4}/g);
  /*
  * convert 4-bit segment to decimal value
  * segment must be reversed again to allow
  * toDec function to process properly
  * convert the decimal value into hex value
  * and push into list of converted segments 
  */
  segs = segs.map((seg) => {
    return toHex(toDec(seg.split('').reverse().join('')));
  });
  
  /* 
  * reverse list of hex conversions
  * to put back in proper order
  * then reassemble into a string result 
  */
  return trimLeadingZeroes(segs.reverse().join(''));
}


/*
* Takes a binary and converts 
* to octal number value (returns as string)
* arg1 is value to convert
* returns null if invalid value
*/
function toOct(value) {
  if (value == null || value == undefined ||
    !isValid(value)) return null;
  if (typeof(value) != "string") value = value.toString();
  // value = trimLeadingZeroes(value);
  // if (value.length == 0) return '';
  
  const {toOct} = require('./decimal.js');


  // reverse string value so interpreted from right to left
  // so they will be broken into 3-bit segments properly
  value = value.split('').reverse().join('');

  // break value into 3-bit segments
  let segs = value.match(/.{1,3}/g);

  /*
  * convert 3-bit segment to decimal value
  * reverse segment again so toDec function processes properly
  * convert the decimal value into octal value
  * and push into list of converted segments
  */
  segs = segs.map((seg) => {
    return toOct(toDec(seg.split('').reverse().join('')));
  });

  /*
  * reverse list of octal conversions
  * to put back in proper order
  * then reassemble into a string result
  */
  return trimLeadingZeroes(segs.reverse().join(''));
}


/**
 * Takes a binary value and pads front with zeroes (if necessary) to 
 * make value into the desired bit-length.
 * @param {number} bits - Desired bit-length 
 * @param {string|number} value - Value to pad
 * @returns {string} - Returns value padded to desired bit-length.
 */
function padToBits(bits, value) {
  const {repeat} = require('./helper.js');
  return repeat(bits - value.length, '0') + value;
}


/**
 * Checks if value is a valid binary number for conversion.
 * @param {string} value - Value to validate.
 * @returns {boolean}
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
