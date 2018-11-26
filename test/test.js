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
  undf: { // undefined
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
      "binary": null,
      "octal": null,
      "decimal": null,
      "hexadecimal": null
    }
  },
  null: {
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
      "binary": null,
      "octal": null,
      "decimal": null,
      "hexadecimal": null
    }
  },
  "": {
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
      "binary": null,
      "octal": null,
      "decimal": null,
      "hexadecimal": null
    }
  },
  "0": {
    "binary": {
      "binary": "0",
      "octal": "0",
      "decimal": "0",
      "hexadecimal": "0"
    },
    "octal": {
      "binary": "0",
      "octal": "0",
      "decimal": "0",
      "hexadecimal": "0"
    },
    "decimal": {
      "binary": "0",
      "octal": "0",
      "decimal": "0",
      "hexadecimal": "0"
    },
    "hexadecimal": {
      "binary": "0",
      "octal": "0",
      "decimal": "0",
      "hexadecimal": "0"
    }
  },
  "00": {
    "binary": {
      "binary": "0",
      "octal": "0",
      "decimal": "0",
      "hexadecimal": "0"
    },
    "octal": {
      "binary": "0",
      "octal": "0",
      "decimal": "0",
      "hexadecimal": "0"
    },
    "decimal": {
      "binary": "0",
      "octal": "0",
      "decimal": "0",
      "hexadecimal": "0"
    },
    "hexadecimal": {
      "binary": "0",
      "octal": "0",
      "decimal": "0",
      "hexadecimal": "0"
    }
  },
  "0000000": {
    "binary": {
      "binary": "0",
      "octal": "0",
      "decimal": "0",
      "hexadecimal": "0"
    },
    "octal": {
      "binary": "0",
      "octal": "0",
      "decimal": "0",
      "hexadecimal": "0"
    },
    "decimal": {
      "binary": "0",
      "octal": "0",
      "decimal": "0",
      "hexadecimal": "0"
    },
    "hexadecimal": {
      "binary": "0",
      "octal": "0",
      "decimal": "0",
      "hexadecimal": "0"
    }
  },
  '1': {
    "binary": {
      "binary": "1",
      "octal": "1",
      "decimal": "1",
      "hexadecimal": "1"
    },
    "octal": {
      "binary": "1",
      "octal": "1",
      "decimal": "1",
      "hexadecimal": "1"
    },
    "decimal": {
      "binary": "1",
      "octal": "1",
      "decimal": "1",
      "hexadecimal": "1"
    },
    "hexadecimal": {
      "binary": "1",
      "octal": "1",
      "decimal": "1",
      "hexadecimal": "1"
    }
  },
  '01': {
    "binary": {
      "binary": "1",
      "octal": "1",
      "decimal": "1",
      "hexadecimal": "1"
    },
    "octal": {
      "binary": "1",
      "octal": "1",
      "decimal": "1",
      "hexadecimal": "1"
    },
    "decimal": {
      "binary": "1",
      "octal": "1",
      "decimal": "1",
      "hexadecimal": "1"
    },
    "hexadecimal": {
      "binary": "1",
      "octal": "1",
      "decimal": "1",
      "hexadecimal": "1"
    }
  },
  '00001': {
    "binary": {
      "binary": "1",
      "octal": "1",
      "decimal": "1",
      "hexadecimal": "1"
    },
    "octal": {
      "binary": "1",
      "octal": "1",
      "decimal": "1",
      "hexadecimal": "1"
    },
    "decimal": {
      "binary": "1",
      "octal": "1",
      "decimal": "1",
      "hexadecimal": "1"
    },
    "hexadecimal": {
      "binary": "1",
      "octal": "1",
      "decimal": "1",
      "hexadecimal": "1"
    }
  },
  '0001000': {
    "binary": {
      "binary": "1000",
      "octal": "10",
      "decimal": "8",
      "hexadecimal": "8"
    },
    "octal": {
      "binary": "1000000000",
      "octal": "1000",
      "decimal": "512",
      "hexadecimal": "200"
    },
    "decimal": {
      "binary": "1111101000",
      "octal": "1750",
      "decimal": "1000",
      "hexadecimal": "3e8"
    },
    "hexadecimal": {
      "binary": "1000000000000",
      "octal": "10000",
      "decimal": "4096",
      "hexadecimal": "1000"
    }
  },
  '100': {
    "binary": {
      "binary": "100",
      "octal": "4",
      "decimal": "4",
      "hexadecimal": "4"
    },
    "octal": {
      "binary": "1000000",
      "octal": "100",
      "decimal": "64",
      "hexadecimal": "40"
    },
    "decimal": {
      "binary": "1100100",
      "octal": "144",
      "decimal": "100",
      "hexadecimal": "64"
    },
    "hexadecimal": {
      "binary": "100000000",
      "octal": "400",
      "decimal": "256",
      "hexadecimal": "100"
    }
  },
  '100111000101011100000111': {
    "binary": {
      "binary": "100111000101011100000111",
      "octal": "47053407",
      "decimal": "10245895",
      "hexadecimal": "9c5707"
    },
    "octal": {
      "binary": "1000000001001001000000000001000001000001001001000000000000000001001001",
      "octal": "100111000101011100000111",
      "decimal": "591610865917888561225",
      "hexadecimal": "201240041049000049"
    },
    "decimal": {
      "binary": "10101001100110000011100110111011101010000111100000101100101111101111101101111",
      "octal": "25146034673520740545757557",
      "decimal": "100111000101011100000111",
      "hexadecimal": "15330737750f0597df6f"
    },
    "hexadecimal": {
      "binary": "100000000000100010001000000000000000100000001000000010001000100000000000000000000000100010001",
      "octal": "4000421000004010021040000000421",
      "decimal": "4953049363263684754280546577",
      "hexadecimal": "100111000101011100000111"
    }
  },
  '0012000': {
    "binary": {
      "binary": null,
      "octal": null,
      "decimal": null,
      "hexadecimal": null
    },
    "octal": {
      "binary": "1010000000000",
      "octal": "12000",
      "decimal": "5120",
      "hexadecimal": "1400"
    },
    "decimal": {
      "binary": "10111011100000",
      "octal": "27340",
      "decimal": "12000",
      "hexadecimal": "2ee0"
    },
    "hexadecimal": {
      "binary": "10010000000000000",
      "octal": "220000",
      "decimal": "73728",
      "hexadecimal": "12000"
    }
  },
  '17252470014': {
    "binary": {
      "binary": null,
      "octal": null,
      "decimal": null,
      "hexadecimal": null
    },
    "octal": {
      "binary": "1111010101010100111000000001100",
      "octal": "17252470014",
      "decimal": "2057990156",
      "hexadecimal": "7aaa700c"
    },
    "decimal": {
      "binary": "10000000100010100111100110011111110",
      "octal": "200424746376",
      "decimal": "17252470014",
      "hexadecimal": "40453ccfe"
    },
    "hexadecimal": {
      "binary": "10111001001010010010001110000000000010100",
      "octal": "27112221600024",
      "decimal": "1590518284308",
      "hexadecimal": "17252470014"
    }
  },
  '9282763583927': {
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
      "binary": "10000111000101001111110100110111000110110111",
      "octal": "207051764670667",
      "decimal": "9282763583927",
      "hexadecimal": "8714fd371b7"
    },
    "hexadecimal": {
      "binary": "1001001010000010011101100011010110000011100100100111",
      "octal": "111202354326034447",
      "decimal": "2577424425957671",
      "hexadecimal": "9282763583927"
    }
  },
  '999999999999999999999999999': {
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
      "binary": "110011101100101110001111001001111111010000100000000011110011100111111111111111111111111111",
      "octal": "635456171177204003634777777777",
      "decimal": "999999999999999999999999999",
      "hexadecimal": "33b2e3c9fd0803ce7ffffff"
    },
    "hexadecimal": {
      "binary": "100110011001100110011001100110011001100110011001100110011001100110011001100110011001100110011001100110011001",
      "octal": "463146314631463146314631463146314631",
      "decimal": "194711132195056036069893612345753",
      "hexadecimal": "999999999999999999999999999"
    }
  },
  '00a': {
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
      "binary": "1010",
      "octal": "12",
      "decimal": "10",
      "hexadecimal": "a"
    }
  },
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
      "hexadecimal": "123456789abcdef"
    }
  }
};


runTestSet(TEST_SET, true, true, true, true);


/**
 * Iterates test set and runs selected tests on each element in set
 * @param {Object} set - Object storing a set of tests to run
 * @param {boolean} [doBin=true] - Flag to run test with all binary module functions
 * @param {boolean} [doOct=true] - Flag to run test with all octal module functions
 * @param {boolean} [doDec=true] - Flag to run test with all decimal module functions
 * @param {boolean} [doHex=true] - Flag to run test with all hex module functions
 */
function runTestSet(set, doBin = true, doOct = true, doDec = true, 
doHex = true) { 

  for (const test in set) {
    runTest(test, set[test], doBin, doOct, doDec, doHex);
  }

  // set.forEach(test => {
  //   runTest(test, doValEmpty, doTrimZeroes, doStripValue, doBin, doOct, doDec, doHex);
  // });
 

}


/**
 * Runs a set of tests on a single value
 * The set of tests is each conversion function
 * for each base module
 * @param {string} test - Value to test
 * @param {Object} expected - Object containing all expected test results
 * @param {boolean} [doBin=true] - Flag to run test with all binary module functions
 * @param {boolean} [doOct=true] - Flag to run test with all octal module functions
 * @param {boolean} [doDec=true] - Flag to run test with all decimal module functions
 * @param {boolean} [doHex=true] - Flag to run test with all hex module functions
 */
function runTest(test, expected, doBin = true, doOct = true, doDec = true, 
doHex = true) {
  console.log("Test Run: test=" + test);
  console.log(helper.repeat(40, '='));

  if (doBin) {
    testModBin(test, expected);
    console.log(helper.repeat(40, '.'));
  }

  if (doOct) {
    testModOct(test, expected);
    console.log(helper.repeat(40, '.'));
  }

  if (doDec) {
    testModDec(test, expected);
    console.log(helper.repeat(40, '.'));
  }

  if (doHex) {
    testModHex(test, expected);
    console.log(helper.repeat(40, '.'));
  }

  console.log("\nTest Run Complete");
  console.log(helper.repeat(40, '-') + "\n\n");
}


function testModBin(test, expected) {
  let result, expect;
  
  result = binary.toBin(test);
  expect = expected.binary.binary;
  console.log("test: binary.toBin(" + test + ")");
  console.log("result: " + result);
  console.log("expect: " + expect);
  compResult(result, expect);
  
  result = binary.toOct(test);
  expect = expected.binary.octal;
  console.log("test: binary.toOct(" + test + ")");
  console.log("result: " + result);
  console.log("expect: " + expect);
  compResult(result, expect);

  result = binary.toDec(test);
  expect = expected.binary.decimal;
  console.log("test: binary.toDec(" + test + ")");
  console.log("result: " + result);
  console.log("expect: " + expect);
  compResult(result, expect);

  result = binary.toHex(test);
  expect = expected.binary.hexadecimal;
  console.log("test: binary.toHex(" + test + ")");
  console.log("result: " + result);
  console.log("expect: " + expect);
  compResult(result, expect);
}


function testModOct(test, expected) {
  let result, expect;
  
  result = octal.toBin(test);
  expect = expected.octal.binary;
  console.log("test: octal.toBin(" + test + ")");
  console.log("result: " + result);
  console.log("expect: " + expect);
  compResult(result, expect);

  result = octal.toOct(test);
  expect = expected.octal.octal;
  console.log("test: octal.toOct(" + test + ")");
  console.log("result: " + result);
  console.log("expect: " + expect);
  compResult(result, expect);

  result = octal.toDec(test);
  expect = expected.octal.decimal;
  console.log("test: octal.toDec(" + test + ")");
  console.log("result: " + result);
  console.log("expect: " + expect);
  compResult(result, expect);

  result = octal.toHex(test);
  expect = expected.octal.hexadecimal;
  console.log("test: octal.toHex(" + test + ")");
  console.log("result: " + result);
  console.log("expect: " + expect);
  compResult(result, expect);
}


function testModDec(test, expected) {
  let result, expect;
  
  result = decimal.toBin(test);
  expect = expected.decimal.binary;
  console.log("test: decimal.toBin(" + test + ")");
  console.log("result: " + result);
  console.log("expect: " + expect);
  compResult(result, expect);

  result = decimal.toOct(test);
  expect = expected.decimal.octal;
  console.log("test: decimal.toOct(" + test + ")");
  console.log("result: " + result);
  console.log("expect: " + expect);
  compResult(result, expect);

  result = decimal.toDec(test);
  expect = expected.decimal.decimal;
  console.log("test: decimal.toDec(" + test + ")");
  console.log("result: " + result);
  console.log("expect: " + expect);
  compResult(result, expect);

  result = decimal.toHex(test);
  expect = expected.decimal.hexadecimal;
  console.log("test: decimal.toHex(" + test + ")");
  console.log("result: " + result);
  console.log("expect: " + expect);
  compResult(result, expect);
}


function testModHex(test, expected) {
  let result, expect;
  
  result = hex.toBin(test);
  expect = expected.hexadecimal.binary;
  console.log("test: hex.toBin(" + test + ")");
  console.log("result: " + result);
  console.log("expect: " + expect);
  compResult(result, expect);

  result = hex.toOct(test);
  expect = expected.hexadecimal.octal;
  console.log("test: hex.toOct(" + test + ")");
  console.log("result: " + result);
  console.log("expect: " + expect);
  compResult(result, expect);

  result = hex.toDec(test);
  expect = expected.hexadecimal.decimal;
  console.log("test: hex.toDec(" + test + ")");
  console.log("result: " + result);
  console.log("expect: " + expect);
  compResult(result, expect);

  result = hex.toHex(test);
  expect = expected.hexadecimal.hexadecimal;
  console.log("test: hex.toHex(" + test + ")");
  console.log("result: " + result);
  console.log("expect: " + expect);
  compResult(result, expect);
}

function compResult(result, expected) {
  if (result != expected) console.log("---RESULT MISMATCH!---\n\n");
}