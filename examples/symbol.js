const symbols = [
  "BTCUSDT",
  "ETHUSDT",
  "BCHUSDT",
  "XRPUSDT",
  "EOSUSDT",
  "LTCUSDT",
  "TRXUSDT",
  "ETCUSDT",
  "LINKUSDT",
  "XLMUSDT",
  "ADAUSDT",
  "XMRUSDT",
  "DASHUSDT",
  "ZECUSDT",
  "XTZUSDT",
  "BNBUSDT",
  "ATOMUSDT",
  "ONTUSDT",
  "IOTAUSDT",
  "BATUSDT",
  "VETUSDT",
  "NEOUSDT",
  "QTUMUSDT",
  "IOSTUSDT",
  "THETAUSDT",
  "ALGOUSDT",
  "ZILUSDT",
  "KNCUSDT",
  "ZRXUSDT",
  "COMPUSDT",
  "OMGUSDT",
  "DOGEUSDT",
  "SXPUSDT",
  "KAVAUSDT",
  "BANDUSDT",
  "RLCUSDT",
  "WAVESUSDT",
  "MKRUSDT",
  "SNXUSDT",
  "DOTUSDT",
  "DEFIUSDT",
  "YFIUSDT",
  "BALUSDT",
  "CRVUSDT",
  "TRBUSDT",
  "RUNEUSDT",
  "SUSHIUSDT",
  "SRMUSDT",
  "EGLDUSDT",
  "SOLUSDT",
  "ICXUSDT",
  "STORJUSDT",
  "BLZUSDT",
  "UNIUSDT",
  "AVAXUSDT",
  "FTMUSDT",
  "HNTUSDT",
  "ENJUSDT",
  "FLMUSDT",
  "TOMOUSDT",
  "RENUSDT",
  "KSMUSDT",
  "NEARUSDT",
  "AAVEUSDT",
  "FILUSDT",
  "RSRUSDT",
  "LRCUSDT",
  "MATICUSDT",
  "OCEANUSDT",
  "CVCUSDT",
  "BELUSDT",
  "CTKUSDT",
  "AXSUSDT",
  "ALPHAUSDT",
  "ZENUSDT",
  "SKLUSDT",
  "GRTUSDT",
  "1INCHUSDT",
  "BTCBUSD",
  "CHZUSDT",
  "SANDUSDT",
  "ANKRUSDT",
  "BTSUSDT",
  "LITUSDT",
  "UNFIUSDT",
  "REEFUSDT",
  "RVNUSDT",
  "SFPUSDT",
  "XEMUSDT",
  "BTCSTUSDT",
  "COTIUSDT",
  "CHRUSDT",
  "MANAUSDT",
  "ALICEUSDT",
  "HBARUSDT",
  "ONEUSDT",
  "LINAUSDT",
  "STMXUSDT",
  "DENTUSDT",
  "CELRUSDT",
  "HOTUSDT",
  "MTLUSDT",
  "OGNUSDT",
  "NKNUSDT",
  "SCUSDT",
  "DGBUSDT",
  "1000SHIBUSDT",
  "BAKEUSDT",
  "GTCUSDT",
  "ETHBUSD",
  "BTCDOMUSDT",
  "BNBBUSD",
  "ADABUSD",
  "XRPBUSD",
  "IOTXUSDT",
  "DOGEBUSD",
  "AUDIOUSDT",
  "RAYUSDT",
  "C98USDT",
  "MASKUSDT",
  "ATAUSDT",
  "SOLBUSD",
  "FTTBUSD",
  "DYDXUSDT",
  "1000XECUSDT",
  "GALAUSDT",
  "CELOUSDT",
  "ARUSDT",
  "KLAYUSDT",
  "ARPAUSDT",
  "CTSIUSDT",
  "LPTUSDT",
  "ENSUSDT",
  "PEOPLEUSDT",
  "ANTUSDT",
  "ROSEUSDT",
  "DUSKUSDT",
  "FLOWUSDT",
  "IMXUSDT",
  "API3USDT",
  "GMTUSDT",
  "APEUSDT",
  "WOOUSDT",
  "FTTUSDT",
  "JASMYUSDT",
  "DARUSDT",
  "GALUSDT",
  "AVAXBUSD",
  "NEARBUSD",
  "GMTBUSD",
  "APEBUSD",
  "GALBUSD",
  "FTMBUSD",
  "DODOBUSD",
  "ANCBUSD",
  "GALABUSD",
  "TRXBUSD",
  "1000LUNCBUSD",
  "OPUSDT",
  "DOTBUSD",
  "TLMBUSD",
  "WAVESBUSD",
  "LINKBUSD",
  "SANDBUSD",
  "LTCBUSD",
  "MATICBUSD",
  "CVXBUSD",
  "FILBUSD",
  "1000SHIBBUSD",
  "LEVERBUSD",
  "ETCBUSD",
  "LDOBUSD",
  "UNIBUSD",
  "AUCTIONBUSD",
  "INJUSDT",
  "STGUSDT",
  "FOOTBALLUSDT",
  "SPELLUSDT",
  "1000LUNCUSDT",
  "LUNA2USDT",
  "AMBBUSD",
  "PHBBUSD",
  "LDOUSDT",
  "CVXUSDT",
  "ICPUSDT",
  "APTUSDT",
  "QNTUSDT",
  "APTBUSD",
  "BLUEBIRDUSDT",
  "FETUSDT",
  "AGIXBUSD",
  "FXSUSDT",
  "HOOKUSDT",
  "MAGICUSDT",
  "TUSDT",
  "RNDRUSDT",
  "HIGHUSDT",
  "MINAUSDT",
  "ASTRUSDT",
  "AGIXUSDT",
  "PHBUSDT",
  "GMXUSDT",
  "CFXUSDT",
  "STXUSDT",
  "COCOSUSDT",
  "BNXUSDT",
  "ACHUSDT",
  "SSVUSDT",
  "CKBUSDT",
  "PERPUSDT",
  "TRUUSDT",
  "LQTYUSDT",
  "USDCUSDT",
  "IDUSDT",
  "ARBUSDT",
  "JOEUSDT",
  "TLMUSDT",
  "AMBUSDT",
  "LEVERUSDT",
  "RDNTUSDT",
  "HFTUSDT",
  "XVSUSDT",
  "ETHBTC",
  "BLURUSDT",
  "EDUUSDT",
  "IDEXUSDT",
  "SUIUSDT",
  "1000PEPEUSDT",
  "1000FLOKIUSDT",
  "UMAUSDT",
  "RADUSDT",
  "KEYUSDT",
  "COMBOUSDT",
  "NMRUSDT",
  "MAVUSDT",
  "MDTUSDT",
  "XVGUSDT",
  "WLDUSDT",
  "PENDLEUSDT",
  "ARKMUSDT",
  "AGLDUSDT",
  "YGGUSDT",
  "DODOXUSDT",
  "BNTUSDT",
  "OXTUSDT",
  "SEIUSDT",
  "BTCUSDT_231229",
  "ETHUSDT_231229",
  "CYBERUSDT",
  "HIFIUSDT",
  "ARKUSDT",
  "FRONTUSDT",
  "GLMRUSDT",
  "BICOUSDT",
  "BTCUSDT_240329",
  "ETHUSDT_240329",
  "STRAXUSDT",
  "LOOMUSDT",
  "BIGTIMEUSDT",
  "BONDUSDT",
  "ORBSUSDT",
  "STPTUSDT",
  "WAXPUSDT",
  "BSVUSDT",
  "RIFUSDT",
  "POLYXUSDT",
  "GASUSDT",
  "POWRUSDT",
  "SLPUSDT",
  "TIAUSDT",
  "SNTUSDT",
  "CAKEUSDT",
  "MEMEUSDT",
  "TWTUSDT",
  "TOKENUSDT",
  "ORDIUSDT",
  "STEEMUSDT",
  "BADGERUSDT",
  "ILVUSDT",
  "NTRNUSDT",
  "MBLUSDT",
  "KASUSDT",
  "BEAMXUSDT",
  "1000BONKUSDT",
  "PYTHUSDT",
  "SUPERUSDT",
  "USTCUSDT",
  "ONGUSDT",
  "ETHWUSDT"
];
module.exports = symbols;