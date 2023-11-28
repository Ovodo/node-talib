const axios = require("axios");
const crypto = require("crypto");

const apiKey =
  "mRK8IqXn6Hwbs5USyR3rNguvAuqWrsEpgqFgaFmqokZ284voEvIVkS8Gz2IUaO6z";
const apiSecret =
  "esrjkhwbTQtTM5bvjovpgKnMsWoOPVo2SQ5wI763jnOO6syblnV3cp2veh1ePlig";

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
const apiEndpoint = "https://fapi.binance.com";

// Define the request configuration
const config = {
  headers: {
    "Content-Type": "application/json",
    "X-MBX-APIKEY": apiKey,
  },
};

// Define the endpoint for account information
const endpoint = "/fapi/v1/income";

// Make the request
axios
  .get(
    apiEndpoint + endpoint + "?" + queryString + "&signature=" + signature,
    config
  )
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.error(error.response);
  });
