const axios = require("axios");

// Binance API endpoint for getting Kline/Candlestick data
const url = "https://fapi.binance.com/fapi/v1/markPriceKlines";
const apiKeys =
  "GTD47iEP8b8LvST0Hihf4gU9u3soSuk2Niriz2K7vwJH0Jo6R31lHUa6av9zHjUW";

// Set the timeframe and number of days
const timeframe = "1d";
const numDays = 10;

// Get the current time in milliseconds
const endTime = new Date().getTime();

// Calculate the start time based on the number of days
const startTime = endTime - numDays * 24 * 60 * 60 * 1000;

// Binance API parameters
const params = {
  symbol: "",
  interval: timeframe,

  startTime: startTime,
  endTime: endTime,
  limit: 1,
};

// Make the API request to get the list of symbols
axios
  .get("https://fapi.binance.com/fapi/v1/exchangeInfo")
  .then((response) => {
    const symbols = response.data.symbols;

    // List to store the symbols with at least 7 green candle daily closes
    const symbolsWithGreenCandles = [];

    // Iterate over each symbol
    symbols.forEach((symbol) => {
      params.symbol = symbol.symbol;

      // Make the API request to get the Kline/Candlestick data
      axios
        .get(url, {
          headers: {
            "X-MBX-APIKEY": apiKeys,
          },
          params: params,
        })
        .then((response) => {
          const candles = response.data;

          // Count the number of green candles
          let greenCandlesCount = 0;
          candles.forEach((candle) => {
            // The close price is at index 4 in the Kline/Candlestick data
            const closePrice = parseFloat(candle[4]);
            // The open price is at index 1 in the Kline/Candlestick data
            const openPrice = parseFloat(candle[1]);
            if (closePrice > openPrice) {
              greenCandlesCount++;
            }
          });

          // Check if the symbol has at least 7 green candles
          if (greenCandlesCount >= 7) {
            symbolsWithGreenCandles.push(symbol.symbol);
          }
        })
        .catch((error) => {
          console.log(
            "Error occurred while fetching Kline/Candlestick data:",
            error
          );
        });
    });

    // Print the symbols with at least 7 green candle daily closes
    console.log(
      "Symbols with at least 7 green candle daily closes in the last 10 days:"
    );
    symbolsWithGreenCandles.forEach((symbol) => {
      console.log(symbol);
    });
  })
  .catch((error) => {
    console.log("Error occurred while fetching symbol list:", error);
  });
