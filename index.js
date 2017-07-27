'use strict'

const HMLS = require('hmls')

const vc = new HMLS()

const plugins = [
  {
    register: require('hapi-form-authentication'),
    options: {
      handler: function (username, password, callback) {
        const isValid = password === 'password'
        callback(isValid, {username: username, firstName: username.toUpperCase(), roles: ['SUPERUSER']})
      },
      loginPageFunction: function (input) {
        const page = require('~/pages/login/index.marko')
        return page.stream(input)
      }
    }
  },
  {
    register: require('hapi-acl-auth'),
    options: {
      handler: function (request, callback) {
        console.log(request.auth)
        callback(null, request.auth.credentials)
      },
      policy: 'allow'
    }
  }
]

!async function () {
  await vc.init()
  vc.server.register(plugins, function (err) {
    if (err) {
      throw err
    }
    vc.server.auth.strategy('hfa', 'form')
    vc.start()
    console.log('server started: %s', vc.server.info.uri)
  })
}()
  .catch((err) => {
    console.error(err.message)
  })