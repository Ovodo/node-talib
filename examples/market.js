const axios = require("axios");
const fs = require("fs");
// import { symbols } from "./symbols";
const { symbols } = require("./symbols");
// console.log(symbols);
// Set API endpoint and symbols
const apiEndpoint = "https://fapi.binance.com";
const apiKeys =
  "GTD47iEP8b8LvST0Hihf4gU9u3soSuk2Niriz2K7vwJH0Jo6R31lHUa6av9zHjUW";

// Function to fetch all symbols from Binance Futures API
const fetchSymbols = async () => {
  const res = await axios.get(`${apiEndpoint}/fapi/v1/exchangeInfo`, {
    headers: {
      "X-MBX-APIKEY": apiKeys,
    },
  });
  return res.data.symbols.map((x) => x.symbol);
};
// Function to fetch market data for a symbol
const fetchMarketData = async (symbol) => {
  const res = await axios.get(
    `${apiEndpoint}/fapi/v1/markPriceKlines?symbol=${symbol}&interval=1d&limit=10`
  );
  return res.data;
};
// Main function to check daily closes
const checkDailyCloses = async () => {
  // Array to store symbols with at least 7 green daily closes
  const greenSymbols = [];

  // Create an array of promises to fetch market data for all symbols
  const marketDataPromises = symbols.map((symbol) => fetchMarketData(symbol));

  // Wait for all promises to resolve
  const allMarketData = await Promise.all(marketDataPromises);

  // Process market data for each symbol
  for (let i = 0; i < symbols.length; i++) {
    const symbol = symbols[i];
    const marketData = allMarketData[i];

    // Count number of green daily closes
    let greenCount = 0;
    for (const data of marketData) {
      const open = parseFloat(data[1]);
      const close = parseFloat(data[4]);
      if (close > open) {
        greenCount++;
      }
    }

    // Check if symbol has at least 7 green daily closes
    if (greenCount >= 7) {
      greenSymbols.push(symbol);
    }
  }

  // Log symbols with at least 7 green daily closes
  console.log(greenSymbols);
};

// Run main function
checkDailyCloses();

module.exports = fetchSymbols; 
