// const fs = require("fs");
import fs from "fs";
// const fetchSymbols = require("./market"); // Adjust the path to point to the file containing the fetchSymbols function
// const symbol = await fetchSymbols();

export const storeSymbolsInFile = async (symbols, fileName) => {
  try {
    // Format the data as a JS array
    const fileContent = `const symbols = ${JSON.stringify(
      symbols,
      null,
      2
    )};\nmodule.exports = symbols;`;

    // Write the data to a new JS file
    fs.writeFileSync(fileName, fileContent);
    console.log("Symbols saved to symbol.js");
  } catch (error) {
    console.error("Error fetching symbols:", error);
  }
};

// storeSymbolsInFile(["JOSOJ", "LSOSO"], "symbo.js");

// module.exports = { storeSymbolsInFile };
