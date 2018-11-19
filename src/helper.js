/*
* Helper module
* contains logic used by more than one single module
*/

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


/*
* Trims off any leading zeroes in a value
*/
function trimLeadingZeros(value) {
  if (value = '0') return value;
  return value.replace(/^0*/, '');
}


/*
* EXPORTS
*/
module.exports = {
  repeat,
  trimLeadingZeros
};

