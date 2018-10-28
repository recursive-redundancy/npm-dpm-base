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
* Trims off any leading zeroes in a binary value
*/
function trimLeadingZeros(value) {
  return value.replace(/^0*/, '');
}


/*
* Takes a single digit alphanumeric
* and codes it to an alpha value
* i.e: '10'
*/
function alphaToNumeral(digit) {

}

function numeralToAlpha(digit) {

}

/*
* EXPORTS
*/
module.exports = {
  repeat,
  trimLeadingZeros
};

