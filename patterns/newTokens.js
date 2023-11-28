const { allSymbols } = require("../symbols/crypto");
var talib = require("../build/Release/talib");
const axios = require("axios");
const apiEndpoint = "https://fapi.binance.com";

const isNewlyListed = async (symbol) => {
  try {
    const tenDaysAgo = Date.now() - 20 * 24 * 60 * 60 * 1000;
    const res = await axios.get(
      `${apiEndpoint}/fapi/v1/markPriceKlines?symbol=${symbol}&interval=1d&limit=100`
    );

    // Debugging log

    return res.data.length < 40; // Check if data is less than 10 days
  } catch (error) {
    console.error(`Error fetching data for ${symbol}:`, error.message);
    return false; // Return false by default in case of an error
  }
};

const checkNewlyListedSymbols = async () => {
  console.log("Loading...");

  const newlyListedPromises = allSymbols.map(isNewlyListed);
  const newlyListedResults = await Promise.all(newlyListedPromises);

  const newSymbols = allSymbols.filter(
    (symbol, index) => newlyListedResults[index]
  );

  console.log("Newly listed symbols:", newSymbols);
};

checkNewlyListedSymbols();
