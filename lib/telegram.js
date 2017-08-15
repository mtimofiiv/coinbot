const Slimbot = require('slimbot')


class TelegramBot {

  constructor(token, callback) {
    this.bot = new Slimbot(token)
    this.listen(callback)
  }

  listen(callback) {
    this.bot.on('message', message => {
      switch (message.text) {
        case '/balance': callback(message.chat.id)
      }
    })

    this.bot.startPolling()
  }

  sendCoinStats(chatId, data) {
    return new Promise((resolve, reject) => {
      let content = `### Fiiv current total asset value is €${data.TOTAL}.\n`

      for (const coin in data) {
        if (coin === 'TOTAL') continue
        content += `  ${coin} value is €${data[coin].currentValue}\n`
      }

      const options = {
        parse_mode: 'Markdown'
      }

      this.bot.sendMessage(chatId, content, options).then(resolve)
    })
  }

  sendError(chatId, error) {
    return new Promise((resolve, reject) => {
      this.bot.sendMessage(chatId, `An error occurred - ${error.message}`).then(resolve)
    })
  }

}

module.exports = TelegramBot
