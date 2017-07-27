'use strict'

module.exports = {
  method: 'get',
  path: '/secure',
  config: {
    auth: 'hfa'
  },
  handler: function (req, reply) {
    const page = require('~/pages/secure/index.marko')
    reply(page.stream(
      {
        credentials: req.auth.credentials
      }
    ))
  }
}