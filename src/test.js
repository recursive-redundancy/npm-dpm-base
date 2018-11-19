/*
* A very simple script for testing purposes
* runs all conversion module functions
* against a defined set of test values
* and outputs each result
*/
const { binary, octal, decimal, hex } = require('./main');
const helper = require('./helper');

var undf;

/**
 * Set of test values
 */
const TEST_SET = [
  undf, // undefined
  null,
  '',
  '0',
  '00',
  '0000000',
  '1',
  '01',
  '00001',
  '0001000',
  '0012000',
  '999999999999999999999999999',
  '100',
  '00a',
  '0123456789abcdef',
];


runAllTests(TEST_SET);



/*
* Iterates set of test values
* and runs all tests on each value
*/
function runAllTests(set) {
  set.forEach(test => {
    runTest(test);
  });
}


/*
* Runs a set of tests on a single value
* The set of tests is each conversion function
* for each base module
*/
function runTest(test) {
  
  // testIsValEmpty(test);

  testTrimZeroes(test);

  testStripValue(test, binary.isValid, "binary");
  testStripValue(test, octal.isValid, "octal");
  testStripValue(test, decimal.isValid, "decimal");
  testStripValue(test, hex.isValid, "hexadecimal");


  /*
  * Binary module tests
  */
  console.log("binary.toBin(" + test + ")");
  console.log(binary.toBin(test));
  console.log("binary.toOct(" + test + ")");
  console.log(binary.toOct(test));
  console.log("binary.toDec(" + test + ")");
  console.log(binary.toDec(test));
  console.log("binary.toHex(" + test + ")");
  console.log(binary.toHex(test));

  /*
  * Octal module tests
  */
  console.log("octal.toBin(" + test + ")");
  console.log(octal.toBin(test));
  console.log("octal.toOct(" + test + ")");
  console.log(octal.toOct(test));
  console.log("octal.toDec(" + test + ")");
  console.log(octal.toDec(test));
  console.log("octal.toHex(" + test + ")");
  console.log(octal.toHex(test));

  /*
  * Decimal module tests
  */
  console.log("decimal.toBin(" + test + ")");
  console.log(decimal.toBin(test));
  console.log("decimal.toOct(" + test + ")");
  console.log(decimal.toOct(test));
  console.log("decimal.toDec(" + test + ")");
  console.log(decimal.toDec(test));
  console.log("decimal.toHex(" + test + ")");
  console.log(decimal.toHex(test));

  /*
  * Hex module tests
  */
  console.log("hex.toBin(" + test + ")");
  console.log(hex.toBin(test));
  console.log("hex.toOct(" + test + ")");
  console.log(hex.toOct(test));
  console.log("hex.toDec(" + test + ")");
  console.log(hex.toDec(test));
  console.log("hex.toHex(" + test + ")");
  console.log(hex.toHex(test));
}

/*
* isValEmpty must be exported
*/
function testIsValEmpty(test){
  console.log("isValEmpty(" + test + ")");
  console.log(helper.isValEmpty(test));
}


function testStripValue(test, validator, valdtrName) {
  console.log("stripValue(" + test + ", " + valdtrName + ")");
  console.log(helper.stripValue(test, validator));
}


function testTrimZeroes(test) {
  console.log("trimLeadingZeroes(" + test + ")");
  console.log(helper.trimLeadingZeroes(test));
}