const Redis = require('redis')

class Store {

  constructor(uri) {
    this.client = Redis.createClient(uri)
  }



}

module.exports = Store
