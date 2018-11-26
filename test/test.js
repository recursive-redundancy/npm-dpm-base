/**
 * Test - unit testing script.
 * A very simple script for unit testing module functionality.
 */

const { binary, octal, decimal, hex } = require('../src/main');
const helper = require('../src/helper');


// a variabled that is undefined
var undf;

/** 
 * Set of test values in key/value pairs
 * Key is test value
 * Value is an object representing expected results
 * for each possible base to base conversion
 */
const TEST_SET = {
  // undf, // undefined
  // null,
  // '',
  // '0',
  // '00',
  // '0000000',
  // '1',
  // '01',
  // '00001',
  // '0001000',
  /** 
   *  binary:
   *  toBin-
   *  toOct-
   *  toDec-
   *  toHex-
   * 
   *  octal:
   *  toBin-
   *  toOct-
   *  toDec-
   *  toHex-
   * 
   *  decimal:
   *  toBin-
   *  toOct-
   *  toDec-
   *  toHex-
   *
   *  hexadecimal:
   *  toBin-
   *  toOct-
   *  toDec-
   *  toHex-
   */
  // '100',
  /** 
   *  binary:
   *  toBin-
   *  toOct-
   *  toDec-
   *  toHex-
   * 
   *  octal:
   *  toBin-
   *  toOct-
   *  toDec-
   *  toHex-
   * 
   *  decimal:
   *  toBin-
   *  toOct-
   *  toDec-
   *  toHex-
   *
   *  hexadecimal:
   *  toBin-
   *  toOct-
   *  toDec-
   *  toHex-
   */
  // '100111000101011100000111',
  /** 
   *  binary:
   *  toBin-
   *  toOct-
   *  toDec-
   *  toHex-
   * 
   *  octal:
   *  toBin-
   *  toOct-
   *  toDec-
   *  toHex-
   * 
   *  decimal:
   *  toBin-
   *  toOct-
   *  toDec-
   *  toHex-
   *
   *  hexadecimal:
   *  toBin-
   *  toOct-
   *  toDec-
   *  toHex-
   */
  // '0012000',
  /** 
   *  binary:
   *  toBin-
   *  toOct-
   *  toDec-
   *  toHex-
   * 
   *  octal:
   *  toBin-
   *  toOct-
   *  toDec-
   *  toHex-
   * 
   *  decimal:
   *  toBin-
   *  toOct-
   *  toDec-
   *  toHex-
   *
   *  hexadecimal:
   *  toBin-
   *  toOct-
   *  toDec-
   *  toHex-
   */
  // '17252470014',
  /** 
   *  binary:
   *  toBin-null
   *  toOct-null
   *  toDec-null
   *  toHex-null
   * 
   *  octal:
   *  toBin-1111010101010100111000000001100
   *  toOct-17252470014
   *  toDec-2057990156
   *  toHex-7aaa700c
   * 
   *  decimal:
   *  toBin-10000000100010100111100110011111110
   *  toOct-200424746376
   *  toDec-17252470014
   *  toHex-40453ccfe
   *
   *  hexadecimal:
   *  toBin-10111001001010010010001110000000000010100
   *  toOct-27112221600024
   *  toDec-1590518284308
   *  toHex-17252470014
   */
  // '9282763583927',
  /** 
   *  binary:
   *  toBin-null
   *  toOct-null
   *  toDec-null
   *  toHex-null
   * 
   *  octal:
   *  toBin-null
   *  toOct-null
   *  toDec-null
   *  toHex-null
   * 
   *  decimal:
   *  toBin-10000111000101001111110100110111000110110111
   *  toOct-207051764670667
   *  toDec-9282763583927
   *  toHex-8714fd371b7
   *
   *  hexadecimal:
   *  toBin-1001001010000010011101100011010110000011100100100111
   *  toOct-111202354326034447
   *  toDec-2577424425957671
   *  toHex-9282763583927
   */
  // '999999999999999999999999999',
  /** 
   *  binary:
   *  toBin-null
   *  toOct-null
   *  toDec-null
   *  toHex-null
   * 
   *  octal:
   *  toBin-null
   *  toOct-null
   *  toDec-null
   *  toHex-null
   * 
   *  decimal:
   *  toBin-110011101100101110001111001001111111010000100000000011110011100111111111111111111111111111
   *  toOct-635456171177204003634777777777
   *  toDec-999999999999999999999999999
   *  toHex-33b2e3c9fd0803ce7ffffff
   *
   *  hexadecimal:
   *  toBin-100110011001100110011001100110011001100110011001100110011001100110011001100110011001100110011001100110011001
   *  toOct-463146314631463146314631463146314631
   *  toDec-194711132195056036069893612345753
   *  toHex-999999999999999999999999999
   */
  // '00a',
  /** 
   *  binary:
   *  toBin-null
   *  toOct-null
   *  toDec-null
   *  toHex-null
   * 
   *  octal:
   *  toBin-null
   *  toOct-null
   *  toDec-null
   *  toHex-null
   * 
   *  decimal:
   *  toBin-null
   *  toOct-null
   *  toDec-null
   *  toHex-null
   *
   *  hexadecimal:
   *  toBin-1010
   *  toOct-12
   *  toDec-10
   *  toHex-a
   */
  '0123456789abcdef': {
    "binary": {
      "binary": null,
      "octal": null,
      "decimal": null,
      "hexadecimal": null
    },
    "octal": {
      "binary": null,
      "octal": null,
      "decimal": null,
      "hexadecimal": null
    },
    "decimal": {
      "binary": null,
      "octal": null,
      "decimal": null,
      "hexadecimal": null
    },
    "hexadecimal": {
      "binary": "100100011010001010110011110001001101010111100110111101111",
      "octal": "4432126361152746757",
      "decimal": "81985529216486895",
      "hexadecimal": "0123456789abcdef"
    }
  }
  /** 
   *  binary:
   *  toBin-null
   *  toOct-null
   *  toDec-null
   *  toHex-null
   * 
   *  octal:
   *  toBin-null
   *  toOct-null
   *  toDec-null
   *  toHex-null
   * 
   *  decimal:
   *  toBin-null
   *  toOct-null
   *  toDec-null
   *  toHex-null
   *
   *  hexadecimal:
   *  toBin-100100011010001010110011110001001101010111100110111101111
   *  toOct-4432126361152746757
   *  toDec-81985529216486895
   *  toHex-0123456789abcdef
   */
};


runTestSet(TEST_SET, false, false, false, true, true, true, true);


/**
 * Iterates test set and runs selected tests on each element in set
 * @param {string[]} set - Array of values to run tests upon
 * @param {boolean} [doValEmpty=true] - Flag to run test with isValEmpty helper function
 * @param {boolean} [doTrimZeroes=true] - Flag to run test with trimLeadingZeroes helper function
 * @param {boolean} [doStripValue=true] - Flag to run test with stripValue helper function
 * @param {boolean} [doBin=true] - Flag to run test with all binary module functions
 * @param {boolean} [doOct=true] - Flag to run test with all octal module functions
 * @param {boolean} [doDec=true] - Flag to run test with all decimal module functions
 * @param {boolean} [doHex=true] - Flag to run test with all hex module functions
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
 * @param {boolean} [doValEmpty=true] - Flag to run test with isValEmpty helper function
 * @param {boolean} [doTrimZeroes=true] - Flag to run test with trimLeadingZeroes helper function
 * @param {boolean} [doStripValue=true] - Flag to run test with stripValue helper function
 * @param {boolean} [doBin=true] - Flag to run test with all binary module functions
 * @param {boolean} [doOct=true] - Flag to run test with all octal module functions
 * @param {boolean} [doDec=true] - Flag to run test with all decimal module functions
 * @param {boolean} [doHex=true] - Flag to run test with all hex module functions
 */
function runTest(test, doValEmpty = true, doTrimZeroes = true, 
doStripValue = true, doBin = true, doOct = true, doDec = true, 
doHex = true) {
  console.log("Test Run: test=" + test);
  console.log(helper.repeat(40, '='));

  if (doValEmpty) {
    testIsValEmpty(test);
    console.log(helper.repeat(40, '.'));
  }

  if (doTrimZeroes) {
    testTrimZeroes(test);
    console.log(helper.repeat(40, '.'));
  }

  if (doStripValue) {
    testStripValue(test, binary.isValid, "binary");
    testStripValue(test, octal.isValid, "octal");
    testStripValue(test, decimal.isValid, "decimal");
    testStripValue(test, hex.isValid, "hexadecimal");
    console.log(helper.repeat(40, '.'));
  }

  if (doBin) {
    testModBin(test);
    console.log(helper.repeat(40, '.'));
  }

  if (doOct) {
    testModOct(test);
    console.log(helper.repeat(40, '.'));
  }

  if (doDec) {
    testModDec(test);
    console.log(helper.repeat(40, '.'));
  }

  if (doHex) {
    testModHex(test);
    console.log(helper.repeat(40, '.'));
  }

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
  // console.log("TEST: hex.toBin(" + test + ")");
  // console.log("RESULT: " + hex.toBin(test));
  // console.log("TEST: hex.toOct(" + test + ")");
  // console.log("RESULT: " + hex.toOct(test));
  // console.log("TEST: hex.toDec(" + test + ")");
  // console.log("RESULT: " + hex.toDec(test));
  // console.log("TEST: hex.toHex(" + test + ")");
  // console.log("RESULT: " + hex.toHex(test));
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