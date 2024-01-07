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

// Function to fetch market data for a symbol within a specific time range
const fetchMarketData = async (symbol, startTime, endTime) => {
  const res = await axios.get(
    `${apiEndpoint}/fapi/v1/markPriceKlines?symbol=${symbol}&interval=4h&limit=100`
  );
  return res.data;
};

// Main function to check daily closes
const checkDailyCloses = async () => {
  // Array to store symbols with more than 4 consecutive green 4-hour candles
  const greenSymbols = [];

  // Define start and end time for the data range (October to November 2022)
  const startTime = new Date("2022-10-01").getTime();
  const endTime = new Date("2022-10-07").getTime();

  // Create an array of promises to fetch market data for all symbols
  const marketDataPromises = symbols.map((symbol) =>
    fetchMarketData(symbol, startTime, endTime)
  );

  // Wait for all promises to resolve
  const allMarketData = await Promise.all(marketDataPromises);

  // Process market data for each symbol
  for (let i = 0; i < symbols.length; i++) {
    const symbol = symbols[i];
    const marketData = allMarketData[i];

    // Count consecutive green 4-hour candles
    let consecutiveGreenCount = 0;
    for (const data of marketData) {
      const open = parseFloat(data[1]);
      const close = parseFloat(data[4]);
      if (close > open) {
        consecutiveGreenCount++;
      } else {
        consecutiveGreenCount = 0;
      }

      // Check if symbol has more than 4 consecutive green 4-hour candles
      if (consecutiveGreenCount >= 10) {
        greenSymbols.push(symbol);
        break; // Exit loop if the condition is met
      }
    }
  }

  // Log symbols with more than 4 consecutive green 4-hour candles
  console.log(greenSymbols);
};

// Run main function
checkDailyCloses();

module.exports = fetchSymbols;
