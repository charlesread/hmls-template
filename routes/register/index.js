'use strict'

module.exports = {
  method: 'get',
  path: '/register',
  // config: {
  //   auth: 'hfa'
  // },
  handler: function (req, reply) {
    const page = require('~/pages/register/index.marko')
    reply(page.stream())
  }
}