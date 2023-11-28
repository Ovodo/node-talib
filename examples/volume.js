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
    `${apiEndpoint}/fapi/v1/klines?symbol=${symbol}&interval=4h&limit=21`
  );
  return res.data;
};

// Main function to check daily closes
const checkDailyCloses = async () => {
  // Array to store symbols with daily close below lower band
  const belowLowerBandSymbols = [];

  // Create an array of promises to fetch market data for all symbols
  const marketDataPromises = symbols.map((symbol) => fetchMarketData(symbol));

  // Wait for all promises to resolve
  const allMarketData = await Promise.all(marketDataPromises);

  // Process market data for each symbol
  for (let i = 0; i < symbols.length; i++) {
    const symbol = symbols[i];
    const marketData = allMarketData[i];

    // Calculate Bollinger Bands
    const { upperBand, lowerBand } = calculateBollingerBands(marketData);

    // Check if the volume of the previous candle is 10 times the previous candle close
    const previousClose = parseFloat(marketData[marketData.length - 2][4]);
    const previousVolume = parseFloat(marketData[marketData.length - 2][5]);
    const currentVolume = parseFloat(marketData[marketData.length - 1][5]);

    if (
      previousVolume >= 10 * previousClose &&
      currentVolume < 10 * previousClose
    ) {
      belowLowerBandSymbols.push(symbol);
    }
  }

  // Log symbols with daily close below lower band and matching volume condition
  console.log(belowLowerBandSymbols);
};

// Run main function
checkDailyCloses();
