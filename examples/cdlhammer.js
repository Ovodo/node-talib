var talib = require("../build/Release/talib");
var axios = require("axios");

// Display module version
console.log();
console.log("TALib Version: " + talib.version);

// Set API endpoint, symbol, and API key
const apiEndpoint = "https://fapi.binance.com";
const symbol = "BTCUSDT";
const apiKeys =
  "GTD47iEP8b8LvST0Hihf4gU9u3soSuk2Niriz2K7vwJH0Jo6R31lHUa6av9zHjUW";
const signature =
  "ywhkhdA8XPI3SgM8Cyib6YQm5clTUZMSDRtra7NEN4aEDlCNbJzxV2FtLo0yvaMF";
// Fetch market data from Binance Futures API
axios
  .get(
    `${apiEndpoint}/fapi/v1/markPriceKlines?symbol=${symbol}&interval=1d&signarure=${signature}`,
    {
      headers: {
        "X-MBX-APIKEY": apiKeys,
      },
    }
  )
  .then((res) => {
    // Parse response data
    const marketData = res.data;

    // Extract OHLC data
    const open = marketData.map((x) => parseFloat(x[1]));
    const high = marketData.map((x) => parseFloat(x[2]));
    const low = marketData.map((x) => parseFloat(x[3]));
    const close = marketData.map((x) => parseFloat(x[4]));

    // Execute CDLHAMMER indicator function
    talib.execute(
      {
        name: "CDLHAMMER",
        startIdx: 0,
        endIdx: close.length - 1,
        open: open,
        high: high,
        low: low,
        close: close,
      },
      function (err, result) {
        // Show the result array
        console.log("CDLHAMMER Function Results:");
        console.log(result);
      }
    );
  });
