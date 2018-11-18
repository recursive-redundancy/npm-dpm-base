/*
* Binary module
* contains all logic and functionality for binary conversions
* Binary to: decimal, hex, octal
*/
"use strict";

const {trimLeadingZeros} = require('./helper.js');

/* 
* takes a binary number value
* and returns value converted into decimal format (returns as string)
* args is value to convert to decimal
*/
function toDec(value) {
  if (!isValid(value)) return null;
  if (typeof(value) != "string") value = value.toString();

  const {basetoDec} = require('./decimal.js');

  return basetoDec('2', value);
}


/*
* Converts from binary to binary (returns as string)
* Since converting to and from same base, simply
* return the input value
* arg1 is value to convert
*/
function toBin(value) {
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

  value = trimLeadingZeros(value);

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
  return trimLeadingZeros(segs.reverse().join(''));
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
  
  const {toOct} = require('./decimal.js');

  value = trimLeadingZeros(value);

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
  return trimLeadingZeros(segs.reverse().join(''));
}


/*
* Takes a binary value
* and pads front with zeros (if necessary)
* to make value proper bit length
* corresponding to bits argument
* returns padded value as string
* arg1 is # of bits to pad to
* arg2 is binary value to pad
*/
function padToBits(bits, value) {
  if (isNaN(bits)) return value;
  bits = parseInt(bits);
  if (typeof(value) != "string") value = value.toString();

  const {repeat} = require('./helper.js');

  return repeat(bits - value.length, '0') + value;
}


/*
* Checks if value is a valid binary number for conversion
* return true if valid, false otherwise
* arg1 is value to check
*/
function isValid(value) {
  if (value == null || value == undefined) return false;
  if (typeof(value) != "string") value = value.toString();
  if (value.length == 0) return false;
  
  // allow only digits of 0 or 1
  if (value.match(/[^0-1]/g)) return false;

  return true;
}


/*
* EXPORTS
*/
module.exports = {
  isValid,
  toBin,
  toDec,
  toHex,
  toOct,
  padToBits
};
