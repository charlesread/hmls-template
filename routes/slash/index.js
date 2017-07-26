'use strict'

module.exports = {
  method: 'get',
  path: '/',
  config: {
    auth: 'hfa'
  },
  handler: function (req, reply) {
    const page = require('~/pages/slash/index.marko')
    reply(page.stream(
      {
        now: new Date()
      }
    ))
  }
}