/*
* A very simple script for testing purposes
* runs all conversion module functions
* against a defined set of test values
* and outputs each result
*/

const { binary, octal, decimal, hex } = require('./main');
const {repeat} = require('./helper');

// set of test values
const vals = [
  '',
  '0',
  '00',
  '0000000',
  '1',
  '01',
  '00001',
  '999999999999999999999999999',
  '100',
  // 'a',
  // '0123456789abcdef',
];


runTests(vals);





/*
* Iterates set of test values
* and runs all tests on each value
*/
function runTests(set) {
  vals.forEach(val => {
    runTestSet(val);
  });
}


/*
* Runs a set of tests on a single value
* The set of tests is each conversion function
* for each base module
*/
function runTestSet(val) {
  /*
  * Binary module tests
  */
  console.log("binary.toBin(" + val + ")");
  console.log(binary.toBin(val));
  console.log("binary.toOct(" + val + ")");
  console.log(binary.toOct(val));
  console.log("binary.toDec(" + val + ")");
  console.log(binary.toDec(val));
  console.log("binary.toHex(" + val + ")");
  console.log(binary.toHex(val));

  /*
  * Octal module tests
  */
  console.log("octal.toBin(" + val + ")");
  console.log(octal.toBin(val));
  console.log("octal.toOct(" + val + ")");
  console.log(octal.toOct(val));
  console.log("octal.toDec(" + val + ")");
  console.log(octal.toDec(val));
  console.log("octal.toHex(" + val + ")");
  console.log(octal.toHex(val));

  /*
  * Decimal module tests
  */
  console.log("decimal.toBin(" + val + ")");
  console.log(decimal.toBin(val));
  console.log("decimal.toOct(" + val + ")");
  console.log(decimal.toOct(val));
  console.log("decimal.toDec(" + val + ")");
  console.log(decimal.toDec(val));
  console.log("decimal.toHex(" + val + ")");
  console.log(decimal.toHex(val));

  /*
  * Hex module tests
  */
  console.log("hex.toBin(" + val + ")");
  console.log(hex.toBin(val));
  console.log("hex.toOct(" + val + ")");
  console.log(hex.toOct(val));
  console.log("hex.toDec(" + val + ")");
  console.log(hex.toDec(val));
  console.log("hex.toHex(" + val + ")");
  console.log(hex.toHex(val));
}