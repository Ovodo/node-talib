var talib = require("../build/Release/talib");
const axios = require("axios");
const apiEndpoint = "https://fapi.binance.com";
const { symbols } = require("./symbols");

// Function to fetch market data for a symbol
const fetchMarketData = async (symbol) => {
  const res = await axios.get(
    `${apiEndpoint}/fapi/v1/markPriceKlines?symbol=${symbol}&interval=8h&limit=100`
  );
  return res.data;
};

// Function to identify peaks in data
const identifyPeaks = (data, times) => {
  let peaks = [];
  for (let i = 1; i < data.length - 1; i++) {
    if (data[i] > data[i - 1] && data[i] > data[i + 1] && data[1]) {
      peaks.push({ index: i, time: times[i], value: data[i] });
    }
  }
  return peaks;
};

// Main function to check daily closes
const checkDailyCloses = async () => {
  console.log("Loading...");

  // Create an array of promises to fetch market data for all symbols
  const marketDataPromises = symbols.map((symbol) => fetchMarketData(symbol));

  // Wait for all promises to resolve
  const allMarketData = await Promise.all(marketDataPromises);

  // Function to calculate RSI values
  const calculateRSI = (data) => {
    const closes = data.map((x) => parseFloat(x[4]));

    // Set RSI parameters
    const rsiParams = {
      name: "RSI",
      startIdx: 0,
      endIdx: closes.length - 1,
      inReal: closes,
      optInTimePeriod: 14,
    };

    // Calculate RSI values
    const rsiValues = talib.execute(rsiParams).result.outReal;

    return rsiValues;
  };

  // Process market data for each symbol
  allMarketData.forEach((marketData, i) => {
    const symbol = symbols[i];

    // Calculate RSI
    const rsi = calculateRSI(marketData);

    let times = marketData.map((x) => new Date(parseInt(x[0])));
    let closes = marketData.map((x) => parseFloat(x[4]));

    // Align times and rsi arrays
    if (times.length > rsi.length) {
      const n = times.length - rsi.length;
      times = times.slice(n);
      closes = closes.slice(n);
    }

    // Identify RSI peaks
    const rsiPeaks = identifyPeaks(rsi, times);

    // Find bullish divergences
    for (let i = 0; i < rsiPeaks.length - 2; i++) {
      const firstPeak = rsiPeaks[i];
      const secondPeak = rsiPeaks[i + 1];
      const thirdPeak = rsiPeaks[i + 2];

      if (
        secondPeak.value > firstPeak.value &&
        closes[secondPeak.index] < closes[firstPeak.index]
        //  &&
        // secondPeak.time.toString().includes("Mon Aug 14")
        // rsiPeaks[i].value < 20
      ) {
        // console.log(`Symbol: ${symbol}, rsi below 30 on ${rsiPeaks[i].time}`);
        // symbol.includes("CYBER") &&
        //   console.log(firstPeak) &

        // firstPeak.value - secondPeak.value >= 10 &&
        console.log(
          `Symbol: ${symbol}, Bullish divergence between ${firstPeak.time.toLocaleString()}, ${secondPeak.time.toLocaleString()}`,
          `${firstPeak.value}, ${secondPeak.value}`
        );
      }
    }
  });
};

// Run main function
checkDailyCloses();
