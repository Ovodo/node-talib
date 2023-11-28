const axios = require("axios");
const fs = require("fs");
const { symbols } = require("./symbols");
const apiEndpoint = "https://fapi.binance.com";
const apiKeys =
  "GTD47iEP8b8LvST0Hihf4gU9u3soSuk2Niriz2K7vwJH0Jo6R31lHUa6av9zHjUW";

// Function to calculate Bollinger Bands
const calculateBollingerBands = (data) => {
  const closes = data.map((x) => parseFloat(x[4]));
  const sma20 = closes.reduce((a, b) => a + b, 0) / closes.length;
  const std20 = Math.sqrt(
    closes.map((x) => Math.pow(x - sma20, 2)).reduce((a, b) => a + b, 0) /
      closes.length
  );
  const upperBand = sma20 + std20 * 2;
  const lowerBand = sma20 - std20 * 2;
  return { upperBand, lowerBand };
};

// Function to fetch market data for a symbol
const fetchMarketData = async (symbol) => {
  const res = await axios.get(
    `${apiEndpoint}/fapi/v1/markPriceKlines?symbol=${symbol}&interval=1d&limit=20`
  );
  return res.data;
};

// Main function to check daily closes
const checkDailyCloses = async () => {
  console.log("Loading...");
  // Array to store symbols with daily close below lower band
  const belowLowerBandSymbols = [];

  // Create an array of promises to fetch market data for all symbols
  const marketDataPromises = symbols.map((symbol) => fetchMarketData(symbol));

  // Wait for all promises to resolve
  const allMarketData = await Promise.all(marketDataPromises);

  // Process market data for each symbol

  allMarketData.forEach((marketData, i) => {
    const symbol = symbols[i];
    const { upperBand, lowerBand } = calculateBollingerBands(marketData);

    if (parseFloat(marketData[marketData.length - 1][4]) <= lowerBand) {
      belowLowerBandSymbols.push(symbol);
    }
  });

  // Log symbols with daily close below lower band
  // console.log(belowLowerBandSymbols);
  return belowLowerBandSymbols;
};

// Run main function
checkDailyCloses();

module.exports = {
  checkDailyCloses,
};
