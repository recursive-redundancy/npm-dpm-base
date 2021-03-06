"use strict";

/**
 * Helper Module. Contains helper logic used package-wide.
 * @module helper
 */

/**
 * Checks whether value has any meaningful value to be parsed.
 * @param {string|number} value - Value to check.
 * @returns {boolean} True if value is null, undefined or empty. False otherwise.
 */
function isValEmpty(value) {
  if (value == null || value == undefined || value == '') return true;
  return false;
}
/**
 * Generic template function to validate values. To be called by each 
 * individual base module, which supplies a regular expression that matches 
 * an invalid format for the base's value.
 * Note: use isValEmpty function prior to checking isValid to verify
 * value contains some kind of value to validate.
 * @param {string} value - Value to validate.
 * @param {RegExp} regEx - A regular expression to match invalid formats
 * @returns {boolean} - True if valid value. False otherwise.
 */


function isValid(value, regEx) {
  if (value.match(regEx)) return false;
  return true;
}
/**
 * Replacement for String.prototype.repeat behavior
 * which is not supported in older browsers
 * @param {string|number} times - How many times to repeat value
 * @param {string} value - Value to be repeated
 * @returns {string}
 */


function repeat(times, value) {
  if (isValEmpty(value) || isValEmpty(times) || times == 0) return "";
  if (times == 1) return value;
  var result = '';

  for (var i = 0; i < times; i++) {
    result += value;
  }

  return result;
}
/**
 * Helper function for start of all module conversion functions.
 * Takes input value and strips it down. First, checks supplied module's 
 * isValid function to test value is valid. Then, converts value to string 
 * and validates the value according to base format. Finally, trims value
 * for leading zeroes, leaving a properly stripped value to convert.
 * @param {string|number} value - Value to strip.
 * @param {function} validator - function to validate base value
 * @returns {string|null} null if invalid value. Otherwise, returns stripped value.
 */


function stripValue(value, validator) {
  if (isValEmpty(value)) return null;
  value = value.toString();
  if (!validator(value)) return null;
  return trimLeadingZeroes(value);
}
/**
 * Trims off any leading zeroes in a value. 
 * Will leave one zero if it is not proceeded by
 * any other characters - effectively leaving a lone zero.
 * @param {string|number} value - Value to be trimmed
 * @returns {string|null} Value trimmed of leading zeros or null if value is empty
 */


function trimLeadingZeroes(value) {
  if (isValEmpty(value)) return null;
  return value.replace(/^0*(?=\w)/, '');
}

module.exports = {
  isValEmpty: isValEmpty,
  isValid: isValid,
  repeat: repeat,
  stripValue: stripValue,
  trimLeadingZeroes: trimLeadingZeroes
};