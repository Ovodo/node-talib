const axios = require("axios");
const crypto = require("crypto");
require("dotenv").config();

// Your application code goes here

const apiKey =
  "GTD47iEP8b8LvST0Hihf4gU9u3soSuk2Niriz2K7vwJH0Jo6R31lHUa6av9zHjUW";
const apiSecret =
  "ywhkhdA8XPI3SgM8Cyib6YQm5clTUZMSDRtra7NEN4aEDlCNbJzxV2FtLo0yvaMF";

const timestamp = Date.now();

// Define the parameters for your Binance API request
const parameters = {
  timestamp,
  // Add more parameters as needed
};

// Create the query string
const queryString = Object.keys(parameters)
  .map((key) => `${key}=${parameters[key]}`)
  .join("&");

// Create the signature payload
const signature = crypto
  .createHmac("sha256", apiSecret)
  .update(queryString)
  .digest("hex");

// Set up the Binance API endpoint
// const apiEndpoint = "https://fapi.binance.com";
const apiEndpoint = "https://api.bybit.com";

// Define the request configuration
const config = {
  headers: {
    "Content-Type": "application/json",
    "X-MBX-APIKEY": apiKey,
    "X-BAPI-SIGN": signature,
    "X-BAPI-TIMESTAMP": timestamp,
    "X-BAPI-RECV-WINDOW": 50000,
    "X-BAPI-SIGN-TYPE": 2,
  },
};

// Define the endpoint for account information
// const endpoint = "/fapi/v1/income";
const endpoint = "/v5/account/wallet-balance?accountType=UNIFIED&coin=APT";

// Make the request
axios
  .get(
    // apiEndpoint + endpoint + "?" + queryString + "&signature=" + signature,
    apiEndpoint + endpoint,
    config
  )
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.error(error.response);
  });
