/**
 * Helper Module. Contains logic used package-wide.
 * @module helper
 */

/**
 * Checks whether value has any meaningful value to be parsed.
 * Returns false if value is null, undefined or empty string
 * Returns true otherwise
 * @param {string|number} value - The (alpha)numeric value to check.
 * @returns {boolean} 
 */
function isValEmpty(value) {
  if (value == null || value == undefined ||
    value == '') return true;
  return false;
}

// /**
//  * Takes a string or number value, and if value type is number the value
//  * is converted to string
//  * @param {string|number} value 
//  * @returns {string} Value as string type
//  */
// function numToString(value) {
//   if 
//   if (typeof(value) != "string") value = value.toString();
//   return value;
// }

/*
* Replacement for String.prototype.repeat behavior
* which is not supported in older browsers
*/
function repeat(times, value) {
  let result = '';
  for (let i = 0; i < times; i++) {
    result += value;
  }
  return result;
}

/**
 * Helper function for start of all module conversion functions.
 * Takes input value and strips it down - removes all leading 
 * zeroes from value except if value is a single zero, 
 * in which case returns '0' if value input is '0'.
 * Checks supplied module's isValid function to test value is valid.
 * Additionally, converts value to string if not string already.
 * returns null if value is undefined, null, or !isValid
 * @param {string|number} value - Value to convert.
 * @param {function} validator - function to validate base value
 * @returns {null|string} '0' if value param is 0|'0', null is invalid value
 * otherwise returns stripped value
 */
function stripValue(value, validator) {
  if (isValEmpty(value) || validator(value)) return null;
  value = value.toString();
  value = trimLeadingZeroes(value);
}

/**
  * Trims off any leading zeroes in a value
  * @param {string|number}
  * @returns {string|null} Value trimmed of leading zeros or null is value is empty
  */
function trimLeadingZeroes(value) {
  if (isValEmpty(value)) return null;
  if (value == '0') return value;
  return value.replace(/^0*(?=\w)/, '');
}


/*
* EXPORTS
*/
module.exports = {
  isValEmpty,
  repeat,
  stripValue,
  trimLeadingZeroes
};

