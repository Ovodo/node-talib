const { symbols } = require("../symbols/crypto");
const apiEndpoint = "https://fapi.binance.com";
const axios = require("axios");

const fetchMarketData = async (symbol) => {
  const res = await axios.get(
    `${apiEndpoint}/fapi/v1/markPriceKlines?symbol=${symbol}&interval=1d&limit=20`
  );
  return res.data;
};

const isBearishEngulfing = (firstCandle, secondCandle) => {
  const firstOpen = parseFloat(firstCandle[1]);
  const firstClose = parseFloat(firstCandle[4]);

  const secondOpen = parseFloat(secondCandle[1]);
  const secondClose = parseFloat(secondCandle[4]);

  return (
    firstClose > firstOpen && // First candle is bullish
    secondClose < secondOpen && // Second candle is bearish
    secondOpen >= firstClose && // Second candle opens at the close of the first candle
    secondClose < firstOpen // Closing of the second candle is below the opening of the first one
  );
};

const checkBearishEngulfing = async () => {
  console.log("Loading...");
  const bearishEngulfingSymbols = [];

  const marketDataPromises = symbols.map((symbol) => fetchMarketData(symbol));
  const allMarketData = await Promise.all(marketDataPromises);

  allMarketData.forEach((marketData, i) => {
    const symbol = symbols[i];
    const lastCandle = marketData[marketData.length - 1];
    const penultimateCandle = marketData[marketData.length - 2];

    if (isBearishEngulfing(penultimateCandle, lastCandle)) {
      const timestamp = new Date(lastCandle[0]).toLocaleString();
      bearishEngulfingSymbols.push({ symbol, time: timestamp });
      console.log(`Bearish Engulfing detected for ${symbol} at ${timestamp}`);
    }
  });
  console.log(bearishEngulfingSymbols);
  //   return bearishEngulfingSymbols;
};

// module.exports = { checkBearishEngulfing };

checkBearishEngulfing();
