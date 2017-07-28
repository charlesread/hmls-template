'use strict'

const HMLS = require('hmls')

const api = require('~/lib/api')
const config = require('~/config')

const vc = new HMLS(config.hmls)

const plugins = [
  {
    register: require('hapi-form-authentication'),
    options: {
      handler: function (username, password, callback) {
        (async function () {
          let user = {}
          const validateResults = await api.post('/user/validate', {username, password})
          const valid = validateResults.valid
          if (valid) {
            const userResults = await api.get('/user/by/username/' + username)
            user = userResults.user
            const rolesResults = await api.get('/user-role/by/username/' + username)
            user.roles = rolesResults.roles
          }
          callback(valid, user)
        })()
          .catch((err) => {
            console.error(err.message)
            callback(false)
          })
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
