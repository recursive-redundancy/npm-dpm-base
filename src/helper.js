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


/*
* Replacement for String.prototype.repeat behavior
* which is not supported in older browsers
*/
function repeat(times, value) {
  if (isValEmpty(value) || isValEmpty(times) || times == 0) return "";
  if (times == 1) return value;
  let result = '';
  for (let i = 0; i < times; i++) {
    result += value;
  }
  return result;
}


/**
 * Helper function for start of all module conversion functions.
 * Takes input value and strips it down - removes all leading 
 * zeroes from value, but will leave a single zero value remaining, 
 * in which case returns '0' if value input is '0', '000' returns '0', etc
 * Checks supplied module's isValid function to test value is valid.
 * Additionally, converts value to string
 * returns null if value is undefined, null, or !isValid
 * @param {string|number} value - Value to convert.
 * @param {function} validator - function to validate base value
 * @returns {null|string} '0' if value param is all zeroes, null is invalid value
 * otherwise returns stripped value
 */
function stripValue(value, validator) {
  if (isValEmpty(value) || !validator(value)) return null;
  value = value.toString();
   return trimLeadingZeroes(value);
}


/**
  * Trims off any leading zeroes in a value
  * Will leave one leading zero if it is not proceeded by
  * any other characters - effectively leaving a lone zero.
  * @param {string|number} value - Value to be trimmed
  * @returns {string|null} Value trimmed of leading zeros or null is value is empty
  */
function trimLeadingZeroes(value) {
  if (isValEmpty(value)) return null;
  return value.replace(/^0*(?=\w)/, '');
}


/*
* EXPORTS
*/
module.exports = {
  repeat,
  stripValue,
  trimLeadingZeroes
};

