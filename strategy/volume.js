const axios = require("axios");
const fs = require("fs");
const { symbols } = require("../examples/symbols");

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
    `${apiEndpoint}/fapi/v1/klines?symbol=${symbol}&interval=4h&limit=1000&startTime=${startTime}&endTime=${endTime}`
  );
  return res.data;
};
const fetchMarketDataWithRetry = async (
  symbol,
  startTime,
  endTime,
  retryCount = 0
) => {
  try {
    const res = await axios.get(
      `${apiEndpoint}/fapi/v1/klines?symbol=${symbol}&interval=30m&limit=1000`
    );
    return res.data;
  } catch (error) {
    if (
      (error.code === "ECONNRESET" || error.code === "ETIMEDOUT") &&
      retryCount < 3
    ) {
      console.error(`Retrying fetchMarketData for ${symbol}...`);
      await wait(2 ** retryCount * 1000); // Exponential backoff
      return fetchMarketDataWithRetry(
        symbol,
        startTime,
        endTime,
        retryCount + 1
      );
    } else {
      throw error;
    }
  }
};
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Main function to identify coins with specified criteria
const identifyCoins = async () => {
  // Define start and end time for the data range (October to November 2022)
  const startTime = new Date("2023-12-01").getTime();
  const endTime = new Date("2023-12-30").getTime();

  // Create an array of promises to fetch market data for all symbols
  const marketDataPromises = symbols.map((symbol) =>
    fetchMarketDataWithRetry(symbol, startTime, endTime)
  );

  // Wait for all promises to resolve
  const allMarketData = await Promise.all(marketDataPromises);

  // Process market data for each symbol
  for (let i = 0; i < symbols.length; i++) {
    const symbol = symbols[i];
    const marketData = allMarketData[i];

    // Check for percentage change of volume and price change criteria
    for (let j = 2; j < marketData.length; j++) {
      const currentVolume = parseFloat(marketData[j][5]); // Index 5 is the volume in Binance API response
      const previousVolume = parseFloat(marketData[j - 1][5]);
      const volumeRateOfChange =
        ((currentVolume - previousVolume) / previousVolume) * 100;

      const currentClose = parseFloat(marketData[j][4]); // Index 4 is the close price in Binance API response
      const previousClose = parseFloat(marketData[j - 1][4]);
      const priceChange =
        ((currentClose - previousClose) / previousClose) * 100;

      // Check for criteria
      if (volumeRateOfChange >= 100 && Math.abs(priceChange) > 0) {
        const timestamp = parseInt(marketData[j][0]);
        const date = new Date(timestamp);
        const formattedDate = date.toLocaleDateString();
        const formattedTime = date.toLocaleTimeString();
        console.log(
          `Symbol: ${symbol},Date: ${formattedDate}, Time: ${formattedTime}, Volume Rate of Change: ${volumeRateOfChange.toFixed(
            2
          )}%, Price Change: ${priceChange.toFixed(2)}%`
        );
      }
    }
  }
};

// Run main function
identifyCoins();

module.exports = fetchSymbols;
