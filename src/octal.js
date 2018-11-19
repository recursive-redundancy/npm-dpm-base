/*
* Octal module
* contains all logic and functionality for octal conversions
* Octal to: decimal, binary, hex
*/

const {trimLeadingZeroes} = require('./helper.js');
const {padToBits} = require('./binary.js');

/* 
* takes an octal number value
* and returns value converted into decimal format (returns as string)
* returns null if binary value is invalid
* args is value to convert to decimal
*/
function toDec(value) {
  if (!isValid(value)) return null;
  if (typeof(value) != "string") value = value.toString();

  const {basetoDec} = require('./decimal.js');

  return basetoDec('8', value);
}


/*
* Takes an octal value
* and converts to binary number value (returns as string)
* arg1 is value to convert
* returns null if invalid value
*/
function toBin(value) {
  if (value == null || value == undefined ||
    !isValid(value)) return null;
  if (typeof(value) != "string") value = value.toString();

  const {toBin} = require('./decimal.js');

  value = trimLeadingZeroes(value);

  // break octal value in single digits
  let digits = value.split('');
  digits = digits.map((digit) => {
    /* convert digit to binary
    *  and padd to 3-bits if necessary */
    return padToBits(3, toBin(digit));
  });

  return trimLeadingZeroes(digits.join(''));
}


/*
* Takes an octal value
* and converts to hex number value (returns as string)
* arg1 is value to convert
* returns null if invalid value
*/
function toHex(value) {
  if (value == null || value == undefined ||
    !isValid(value)) return null;
  if (typeof(value) != "string") value = value.toString();

  const {toHex} = require('./binary.js');

  value = trimLeadingZeroes(value);

  // break value into single digits
  let digits = value.split('');
  digits = digits.map((digit) => {
    /* convert digit to binary value
    *  pad it to 3-bit if needed */
    return padToBits(3, toBin(digit));
  });

  /* assemble list of 3-bit binary values
  *  and convert to a single hex value */
  return trimLeadingZeroes(toHex(digits.join('')));
}


/*
* Converts from octal to octal (returns as string)
* Since converting to and from same base, simply
* return the input value
* arg1 is value to convert
*/
function toOct(value) {
  return value;
}


/*
* Checks if value is a valid octal number for conversion
* return true if valid, false otherwise
* arg1 is value to check
*/
function isValid(value) {
  if (value == null || value == undefined) return false;
  if (typeof(value) != "string") value = value.toString();
  if (value.length == 0) return false;

  // allow only digits of 0-7
  if (value.match(/[^0-7]/g)) return false;

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
  toOct
};
