const { checkDailyCloses } = require("../examples/bollinger");

exports.lowerBand = async (req, res) => {
  try {
    const belowLowerBandSymbols = await checkDailyCloses();
    res.send(belowLowerBandSymbols);
  } catch (error) {
    res.status(500).send({
      message: "Error fetching market data",
    });
  }
};
