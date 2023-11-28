const fs = require("fs");
const fetchSymbols = require("./market"); // Adjust the path to point to the file containing the fetchSymbols function

const storeSymbolsInFile = async () => {
  try {
    const symbols = await fetchSymbols();

    // Format the data as a JS array
    const fileContent = `const symbols = ${JSON.stringify(
      symbols,
      null,
      2
    )};\nmodule.exports = symbols;`;

    // Write the data to a new JS file
    fs.writeFileSync("symbol.js", fileContent);
    console.log("Symbols saved to symbol.js");
  } catch (error) {
    console.error("Error fetching symbols:", error);
  }
};

storeSymbolsInFile();
