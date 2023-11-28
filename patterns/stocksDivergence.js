var talib = require("../build/Release/talib");
const axios = require("axios");
const apiEndpoint = "https://twelve-data1.p.rapidapi.com/time_series";
const { nasdaq } = require("../symbols/nasdaq");

const options = {
  method: "GET",
  url: "https://twelve-data1.p.rapidapi.com/time_series",
  params: {
    symbol: "AAPL",
    interval: "1day",
    outputsize: "30",
    format: "json",
  },
  headers: {
    "X-RapidAPI-Key": "58fc9fd74dmsh1504f4f7cbba02dp135d7djsn0d51e3009846",
    "X-RapidAPI-Host": "twelve-data1.p.rapidapi.com",
  },
};

// Function to fetch market data for a symbol
const fetchMarketData = async (symbol) => {
  const res = await axios.get(
    `${apiEndpoint}/?symbol=${symbol}&interval=2h&outputsize=30`,
    {
      headers: {
        "X-RapidAPI-Key": "58fc9fd74dmsh1504f4f7cbba02dp135d7djsn0d51e3009846",
        "X-RapidAPI-Host": "twelve-data1.p.rapidapi.com",
      },
    }
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

  // Create an array of promises to fetch market data for all nasdaq
  const marketDataPromises = fetchMarketData("AAPL");

  // Wait for all promises to resolve
  const allMarketData = await Promise.all(marketDataPromises);

  // Function to calculate RSI values
  const calculateRSI = (data) => {
    const closes = data.map((x) => parseFloat(x[0]));

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
    const symbol = nasdaq[i];

    // Calculate RSI
    const rsi = calculateRSI(marketData);

    let times = marketData.map((x) => new Date(parseInt(x[1])));
    let closes = marketData.map((x) => parseFloat(x[0]));

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
        secondPeak.value < firstPeak.value &&
        closes[secondPeak.index] > closes[firstPeak.index]
        //  &&
        // secondPeak.time.toString().includes("Mon Aug 14")
        // rsiPeaks[i].value < 20
      ) {
        // console.log(`Symbol: ${symbol}, rsi below 30 on ${rsiPeaks[i].time}`);
        // symbol.includes("CYBER") &&
        //   console.log(firstPeak) &

        firstPeak.value - secondPeak.value >= 10 &&
          console.log(
            `Symbol: ${symbol}, Bearish divergence between ${firstPeak.time.toLocaleString()}, ${secondPeak.time.toLocaleString()}`,
            `${firstPeak.value}, ${secondPeak.value}`
          );
      }
    }
  });
};

// Run main function
checkDailyCloses();
