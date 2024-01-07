const axios = require("axios");
const { symbols } = require("./symbols");
// Set API endpoint and symbols
const apiEndpoint = "https://fapi.binance.com";
const apiKeys =
  "GTD47iEP8b8LvST0Hihf4gU9u3soSuk2Niriz2K7vwJH0Jo6R31lHUa6av9zHjUW";

console.log("length", symbols.length);

// Function to fetch market data for a symbol
const fetchMarketData = async (symbol, retryCount = 0) => {
  try {
    const res = await axios.get(
      `${apiEndpoint}/fapi/v1/markPriceKlines?symbol=${symbol}&interval=4h&limit=10`
    );
    return res.data;
  } catch (error) {
    if (
      error.code === "ECONNRESET" ||
      (error.code == "ETIMEDOUT" && retryCount < 3)
    ) {
      console.error(`Retrying fetchMarketData for ${symbol}...`);
      await wait(2 ** retryCount * 1000); // Exponential backoff
      return fetchMarketData(symbol, retryCount + 1);
    } else {
      throw error;
    }
  }
};
const fetch24hr = async (symbol, retryCount = 0) => {
  try {
    const res = await axios.get(
      `${apiEndpoint}/fapi/v1/ticker/24hr?symbol=${symbol}`
    );
    return res.data;
  } catch (error) {
    if (error.code === "ECONNRESET" && retryCount < 3) {
      console.error(`Retrying fetchMarketData for ${symbol}...`);
      await wait(2 ** retryCount * 1000); // Exponential backoff
      return fetchMarketData(symbol, retryCount + 1);
    } else {
      throw error;
    }
  }
};

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

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
// Main function to check 24hr %
const check24hr = async () => {
  // Array to store symbols with at least 7 green daily closes
  const percentage24hr = [];

  // Create an array of promises to fetch market data for all symbols
  const marketDataPromises = symbols.map((symbol) => fetch24hr(symbol));

  // Wait for all promises to resolve
  const allMarketData = await Promise.all(marketDataPromises);

  // Process market data for each symbol
  for (let i = 0; i < symbols.length; i++) {
    const symbol = symbols[i];
    const data = allMarketData[i];
    if (symbol == "IOTAUSDT") {
      console.log(data);
    }

    const percent = data.priceChangePercent;
    if (percent > 30) {
      percentage24hr.push(symbol);
    }
  }

  // Log symbols with at least 7 green daily closes
  console.log(percentage24hr);
};

// Run main function
check24hr();

module.exports = { fetchMarketData, checkDailyCloses, fetch24hr };
