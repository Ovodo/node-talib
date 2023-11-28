var talib = require("../build/Release/talib"),
  util = require("util");
var functions = talib.functions;

// Display module version
console.log();
console.log("TALib Version: " + talib.version);

// Display ADX indicator function specifications
// console.log(util.inspect(talib.explain("ADX"), { depth:3 }));

// var functions = talib.functions;
// for (i in functions) {
//   console.log(functions[i].name);
// }
console.log(util.inspect(talib.explain("BBANDS"), { depth: 3 }));
