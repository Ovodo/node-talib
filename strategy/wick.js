const axios = require("axios");
const fs = require("fs");
const { symbols } = require("../examples/symbols");
const TelegramBot = require("node-telegram-bot-api");
const TOKEN = "6536370558:AAFwmAwxAqW4sbGlzpe6XvHHWfv45MrfIqg";
const bot = new TelegramBot(TOKEN);
const chatId = 5835833708;

// Set API endpoint and symbols
const apiEndpoint = "https://fapi.binance.com";
const apiKeys =
  "GTD47iEP8b8LvST0Hihf4gU9u3soSuk2Niriz2K7vwJH0Jo6R31lHUa6av9zHjUW";

// Function to fetch market data for a symbol within a specific time range with retry mechanism
const fetchMarketDataWithRetry = async (
  symbol,
  startTime,
  endTime,
  retryCount = 0
) => {
  try {
    const res = await axios.get(
      `${apiEndpoint}/fapi/v1/markPriceKlines?symbol=${symbol}&interval=4h&limit=5`,
      {
        timeout: 150000, // Set the timeout to 15 seconds (adjust as needed)
      }
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

// Main function to identify candle wicks with specified criteria
const identifyCandleWicks = async () => {
  // Define start and end time for the data range (October to November 2022)
  const startTime = new Date("2022-10-01").getTime();
  const endTime = new Date("2022-11-30").getTime();
  const output = [];

  const startTimer = Date.now();

  // Create an array of promises to fetch market data for all symbols
  const marketDataPromises = symbols.map((symbol) =>
    fetchMarketDataWithRetry(symbol)
  );

  // Wait for all promises to resolve
  const allMarketData = await Promise.all(marketDataPromises);

  // Stop the timer for Promise.all
  const elapsedTime = Date.now() - startTimer;
  console.log(
    `Time taken for all promises to resolve: ${elapsedTime / 1000} seconds`
  );

  // Process market data for each symbol
  for (let i = 0; i < symbols.length; i++) {
    const symbol = symbols[i];
    const marketData = allMarketData[i];

    // Check for upper wick and green candle criteria
    for (let j = 0; j < marketData.length; j++) {
      const open = parseFloat(marketData[j][1]); // Index 1 is the open price
      const close = parseFloat(marketData[j][4]); // Index 4 is the close price
      const high = parseFloat(marketData[j][2]); // Index 2 is the high price
      const low = parseFloat(marketData[j][3]); // Index 3 is the low price

      // // Calculate upper wick
      // const upperWick = high - Math.max(open, close);

      // Calculate lower wick
      const lowerWick = Math.min(open, close) - low;

      // Calculate percentage profit
      const percentageProfit = ((close - open) / open) * 100;

      // Check for upper wick criteria (over 5%) and green candle close (0% to 1% profit)
      if (
        lowerWick / low >
        0.05105
        // &&
        // percentageProfit > 0 &&
        // percentageProfit <= 3
      ) {
        const timestamp = parseInt(marketData[j][0]);
        const date = new Date(timestamp);
        const formattedDate = date.toLocaleDateString();
        const formattedTime = date.toLocaleTimeString();

        console.log(
          `Symbol: ${symbol}, Date: ${formattedDate}, Time: ${formattedTime}, LowerWick: ${
            (lowerWick / low) * 100
          }%, Percentage Profit: ${percentageProfit.toFixed(2)}%`
        );

        output.push({
          Symbol: symbol,
          Date: formattedDate,
          Time: formattedTime,
          LowerWick: `${((lowerWick / low) * 100).toFixed(2)}%`,
          PnL: `${percentageProfit.toFixed(2)}%`,
        });
      }
    }
  }
  bot.sendMessage(chatId, JSON.stringify(output));
  return output;
};

// Run main function
identifyCandleWicks();

module.exports = identifyCandleWicks;
