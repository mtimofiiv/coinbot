const Slimbot = require('slimbot')


class TelegramBot {

  constructor(token, callback) {
    this.bot = new Slimbot(token)
    this.listen(callback)
  }

  listen(callback) {
    this.bot.on('message', message => {
      switch (message.text) {
        case 'balance': callback(message.chat.id)
      }
    })

    this.bot.startPolling()
  }

  sendCoinStats(chatId, data) {
    return new Promise((resolve, reject) => {
      const messageString = `Asset total is €${data.TOTAL}`
      this.bot.sendMessage(chatId, messageString).then(resolve)
    })
  }

  sendError(chatId, error) {
    return new Promise((resolve, reject) => {
      this.bot.sendMessage(chatId, `An error occurred - ${error.message}`).then(resolve)
    })
  }

}

module.exports = TelegramBot
