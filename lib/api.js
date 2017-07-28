'use strict'

const request = require('request')

const config = require('~/config')

const baseUrl = `http://${config.hmls.server.host}:${config.hmls.server.port}/api`

const api = {
  get: function (path) {
    return new Promise((resolve, reject) => {
      request(
        {
          url: baseUrl + path,
          method: 'get',
          json: true
        },
        function (error, response, body) {
          if (error) {
            return reject(error)
          }
          if (response.statusCode !== 200) {
            return reject(new Error('status code is not 200: %s', response.statusCode))
          }
          resolve(body)
        }
      )
    })
  },
  post: function (path, data) {
    return new Promise((resolve, reject) => {
      request(
        {
          url: baseUrl + path,
          method: 'post',
          body: data,
          json: true
        },
        function (error, response, body) {
          if (error) {
            return reject(error)
          }
          if (response.statusCode !== 200) {
            return reject(new Error('status code is not 200: %s', response.statusCode))
          }
          resolve(body)
        }
      )
    })
  }
}

module.exports = api