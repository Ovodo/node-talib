// import Bree from "bree";
// import Cabin from "cabin";
// import Axe from "axe";
// import Signale from "signale";
const Bree = require("bree");
const TelegramBot = require("node-telegram-bot-api");

const TOKEN = "6536370558:AAFwmAwxAqW4sbGlzpe6XvHHWfv45MrfIqg";
const bot = new TelegramBot(TOKEN, { polling: true });

const Axe = require("axe");
const Cabin = require("cabin");
const { Signale } = require("signale");

const logger = new Axe({
  logger: new Signale(),
});

const bree = new Bree({
  // logger: new Cabin({ logger }),
  logger: false,
  jobs: [{ name: "log", interval: "every 2 hours", timeout: 0 }],
});

// await bree.start();

(async () => {
  await bree.start();
})();
