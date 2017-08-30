const KrakenClient = require('kraken-api')

const FIAT_TETHER = process.env.FIAT_TETHER || 'EUR'

class KrakenAPI {

  constructor(key, secret) {
    this.kraken = new KrakenClient(key, secret)
  }

  get FIAT_TETHER() { return FIAT_TETHER }

  getCurrentFunds() {
    return new Promise(async (resolve, reject) => {
      try {
        const balance = await this.kraken.api('Balance')

        if (balance.error.length > 0) return reject(balance.error)

        return resolve(balance.result)
      } catch (error) {
        return reject(error)
      }
    })
  }

  getCoinValue(coin) {
    return new Promise(async (resolve, reject) => {
      const pair = `${coin}Z${FIAT_TETHER}`

      try {
        const value = await this.kraken.api('Ticker', { pair })

        if (value.error.length > 0) return reject(value.error)

        return resolve(value.result[pair].p[1])
      } catch (error) {
        return reject(error)
      }
    })
  }

}

module.exports = KrakenAPI
