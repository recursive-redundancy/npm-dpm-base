/**
 * Test - unit testing script.
 * A very simple script for unit testing module functionality.
 */

const { binary, octal, decimal, hex } = require('../src/main');
const helper = require('../src/helper');


// a variabled that is undefined
var undf;

/** Set of test values */
const TEST_SET = [
  undf, // undefined
  null,
  // '',
  // '0',
  // '00',
  '0000000',
  // '1',
  '01',
  '00001',
  // '0001000',
  '100',
  // '100111000101011100000111',
  // '0012000',
  // '999999999999999999999999999',
  // '00a',
  // '0123456789abcdef'
];

console.log(hex.isValid('ab'));
runTestSet(TEST_SET, false, false, false, false, false, true, false);


/**
 * Iterates test set and runs selected tests on each element in set
 * @param {string[]} set - Array of values to run tests upon
 * @param {boolean} doValEmpty - Flag to run test with isValEmpty helper function
 * @param {boolean} doTrimZeroes - Flag to run test with trimLeadingZeroes helper function
 * @param {boolean} doStripValue - Flag to run test with stripValue helper function
 * @param {boolean} doBin - Flag to run test with all binary module functions
 * @param {boolean} doOct - Flag to run test with all octal module functions
 * @param {boolean} doDec - Flag to run test with all decimal module functions
 * @param {boolean} doHex - Flag to run test with all hex module functions
 */
function runTestSet(set, doValEmpty = true, doTrimZeroes = true, 
doStripValue = true, doBin = true, doOct = true, doDec = true, 
doHex = true) {
  set.forEach(test => {
    runTest(test, doValEmpty, doTrimZeroes, doStripValue, doBin, doOct, doDec, doHex);
  });
}


/**
 * Runs a set of tests on a single value
 * The set of tests is each conversion function
 * for each base module
 * @param {string[]} set - Array of values to run tests upon
 * @param {boolean} doValEmpty - Flag to run test with isValEmpty helper function
 * @param {boolean} doTrimZeroes - Flag to run test with trimLeadingZeroes helper function
 * @param {boolean} doStripValue - Flag to run test with stripValue helper function
 * @param {boolean} doBin - Flag to run test with all binary module functions
 * @param {boolean} doOct - Flag to run test with all octal module functions
 * @param {boolean} doDec - Flag to run test with all decimal module functions
 * @param {boolean} doHex - Flag to run test with all hex module functions
 */
function runTest(test, doValEmpty = true, doTrimZeroes = true, 
doStripValue = true, doBin = true, doOct = true, doDec = true, 
doHex = true) {
  console.log("Test Run: test=" + test);
  console.log(helper.repeat(40, '='));

  if (doValEmpty) testIsValEmpty(test);

  if (doTrimZeroes) testTrimZeroes(test);

  if (doStripValue) {
    testStripValue(test, binary.isValid, "binary");
    testStripValue(test, octal.isValid, "octal");
    testStripValue(test, decimal.isValid, "decimal");
    testStripValue(test, hex.isValid, "hexadecimal");
  }

  if (doBin) testModBin(test);

  if (doOct) testModOct(test);

  if (doDec) testModDec(test);

  if (doHex) testModHex(test);

  console.log("\nTest Run Complete");
  console.log(helper.repeat(40, '-') + "\n\n");
}


function testModBin(test) {
  console.log("TEST: binary.toBin(" + test + ")");
  console.log("RESULT: " + binary.toBin(test));
  console.log("TEST: binary.toOct(" + test + ")");
  console.log("RESULT: " + binary.toOct(test));
  console.log("TEST: binary.toDec(" + test + ")");
  console.log("RESULT: " + binary.toDec(test));
  console.log("TEST: binary.toHex(" + test + ")");
  console.log("RESULT: " + binary.toHex(test));
}


function testModOct(test) {
  console.log("TEST: octal.toBin(" + test + ")");
  console.log("RESULT: " + octal.toBin(test));
  console.log("TEST: octal.toOct(" + test + ")");
  console.log("RESULT: " + octal.toOct(test));
  console.log("TEST: octal.toDec(" + test + ")");
  console.log("RESULT: " + octal.toDec(test));
  console.log("TEST: octal.toHex(" + test + ")");
  console.log("RESULT: " + octal.toHex(test));
}


function testModDec(test) {
  console.log("TEST: decimal.toBin(" + test + ")");
  console.log("RESULT: " + decimal.toBin(test));
  console.log("TEST: decimal.toOct(" + test + ")");
  console.log("RESULT: " + decimal.toOct(test));
  console.log("TEST: decimal.toDec(" + test + ")");
  console.log("RESULT: " + decimal.toDec(test));
  console.log("TEST: decimal.toHex(" + test + ")");
  console.log("RESULT: " + decimal.toHex(test));
}


function testModHex(test) {
  console.log("TEST: hex.toBin(" + test + ")");
  console.log("RESULT: " + hex.toBin(test));
  console.log("TEST: hex.toOct(" + test + ")");
  console.log("RESULT: " + hex.toOct(test));
  console.log("TEST: hex.toDec(" + test + ")");
  console.log("RESULT: " + hex.toDec(test));
  console.log("TEST: hex.toHex(" + test + ")");
  console.log("RESULT: " + hex.toHex(test));
}


function testIsValEmpty(test){
  console.log("TEST: isValEmpty(" + test + ")");
  console.log("RESULT: " + helper.isValEmpty(test));
}


function testStripValue(test, validator, valdtrName) {
  console.log("TEST: stripValue(" + test + ", " + valdtrName + ")");
  console.log("RESULT: " + helper.stripValue(test, validator));
}


function testTrimZeroes(test) {
  console.log("TEST: trimLeadingZeroes(" + test + ")");
  console.log("RESULT: " + helper.trimLeadingZeroes(test));
}