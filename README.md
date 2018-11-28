# Base Converter (dpm-base)
A simple JavaScript library for converting numeric bases. Comprised of modules 
binary, octal, decimal and hex - supporting functions for conversion of base-2, 
base-8, base-10 and base-16. Conversion logic written in JavaScript, with support 
for big number calculations via bignumber.js dependancy.

## Limitations
- Currently only support conversion of whole number values - no fractional values 
as of yet. Support for fractional conversion may be added in the future.
- Code utilizes some JavaScript ES6 functionality, and this package is left as such.
So if user requires ES5 and/or older browser support, the package must be transpiled 
using method of your choice. I prefer [babel](https://babeljs.io/).
# Installation
npm install dpm-base
# API Documentation
https://recursive-redundancy.github.io/npm-dpm-base/
# Usage
## importing package in script
```
const base = require('dpm-base');
```
## Conversions
Each module contains four basic conversion functions:
- toBin(value) - for conversion from base to binary (base-2)
- toOct(value) - for conversion from base to octal (base-8)
- toDec(value)- for conversion from base to decimal (base-10)
- toHex(value) - for conversion from base to hexadecimal (base-16)

Converted values return as String

These conversion functions return null if supplied value is invalid


Each module also supports converting from its base to the same base, which means 
it simply returns the same value supplied.

Additionally, each module has a function for validating number is valid base value
- isValid(value)
## Binary
### Binary is valid
```
let isValid = base.binary.isValid(1001);
```
### Binary to Binary
```
let result = base.binary.toBin(1001);
```
### Binary to Octal
```
let result = base.binary.toOct(1001);
```
### Binary to Decimal
```
let result = base.binary.toDec(1001);
```
### Binary to Hexadecimal
```
let result = base.binary.toHex(1001);
```
## Octal
### Octal is valid
```
let isValid = base.octal.isValid(1001);
```
### Octal to Binary
```
let result = base.octal.toBin(1001);
```
### Octal to Octal
```
let result = base.octal.toOct(1001);
```
### Octal to Decimal
```
let result = base.octal.toDec(1001);
```
### Octal to Hexadecimal
```
let result = base.octal.toHex(1001);
```
## Decimal
### Decimal is valid
```
let isValid = base.decimal.isValid(1001);
```
### Decimal to Binary
```
let result = base.decimal.toBin(1001);
```
### Decimal to Octal
```
let result = base.decimal.toOct(1001);
```
### Decimal to Decimal
```
let result = base.decimal.toDec(1001);
```
### Decimal to Hexadecimal
```
let result = base.decimal.toHex(1001);
```
## Hexadecimal
### Hexadecimal is valid
```
let isValid = base.hex.isValid(1001);
```
### Hexadecimal to Binary
```
let result = base.hex.toBin(1001);
```
### Hexadecimal to Octal
```
let result = base.hex.toOct(1001);
```
### Hexadecimal to Decimal
```
let result = base.hex.toDec(1001);
```
### Hexadecimal to Hexadecimal
```
let result = base.hex.toHex(1001);
```
### Hexadecimal alphanumeric digit to numeric
```
let result = HEX_ALPHA_TO_DIGIT['a']; // result = '10'
```
### Hexadecimal numeric to alphanumeric digit
```
let result = HEX_ALPHA_TO_DIGIT['15']; // result = 'f' 
```

# Dependencies
[bignumber.js](https://github.com/MikeMcl/bignumber.js) : A JavaScript library 
for arbitrary-precision decimal and non-decimal arithmetic
# License
[MIT](./license.txt)