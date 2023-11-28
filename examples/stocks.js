const axios = require("axios");

const options = {
  method: "GET",
  url: "https://twelve-data1.p.rapidapi.com/time_series",
  params: {
    symbol: "AMZN",
    interval: "1day",
    outputsize: "2",
    format: "PDF",
  },
  headers: {
    "X-RapidAPI-Key": "58fc9fd74dmsh1504f4f7cbba02dp135d7djsn0d51e3009846",
    "X-RapidAPI-Host": "twelve-data1.p.rapidapi.com",
  },
};
const fetchStocks = async () => {
  try {
    const response = await axios.request(options);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

fetchStocks();
