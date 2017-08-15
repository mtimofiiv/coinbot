if (!process.env.PORT) require('dotenv').config()

const TelegramBot = require('./lib/telegram')
const KrakenAPI = require('./lib/kraken')
const Redis = require('./lib/redis')

const Kraken = new KrakenAPI(process.env.KRAKEN_KEY, process.env.KRAKEN_SECRET)
const Store = new Redis(process.env.REDIS_URI)

async function run(chatId) {
  try {
    const balance = await Kraken.getCurrentFunds()
    const data = { TOTAL: 0 }

    for (const coin in balance) {
      const coinValue = await Kraken.getCoinValue(coin)

      data[coin] = {
        amount: (Number(balance[coin])),
        coinValue: (Number(coinValue))
      }

      data[coin].currentValue = (data[coin].amount * data[coin].coinValue)
      data.TOTAL = (data.TOTAL + data[coin].currentValue)
    }

    await CoinBot.sendCoinStats(chatId, data)
  } catch (error) {
    console.error('[ERROR]', error)
    await CoinBot.sendError(chatId, error)
    return error
  }
}

const CoinBot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, run)
