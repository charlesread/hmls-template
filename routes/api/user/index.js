'use strict'

const bcrypt = require('bcrypt')
const boom = require('boom')

const db = require('~/lib/db')
const sql = require('~/lib/sql')

module.exports = [
  {
    method: 'post',
    path: '/api/user',
    handler: function (req, reply) {
      (async function () {
        const hash = await bcrypt.hash(req.payload.password, 10)
        await db.execute(sql.user.create, [req.payload.username, req.payload.firstName, req.payload.lastName, hash])
        reply()
      })()
        .catch((err) => {
          reply(boom.internal(err.message))
          console.error(err.message)
        })
    }
  },
  {
    method: 'put',
    path: '/api/user',
    handler: function (req, reply) {
      (async function () {
        const hash = await bcrypt.hash(req.payload.password, 10)
        await db.execute(sql.user.update, [req.payload.username, req.payload.firstName, req.payload.lastName, hash, req.payload.username])
        reply()
      })()
        .catch((err) => {
          reply(boom.internal(err.message))
          console.error(err.message)
        })
    }
  },
  {
    method: 'post',
    path: '/api/user/validate',
    handler: function (req, reply) {
      (async function () {
        let valid
        const results = await db.execute(sql.user.validate, [req.payload.username])
        if (!results[0]) {
          valid = false
          return reply({valid})
        }
        const hash = results[0].hash
        if (!hash) {
          valid = false
          return reply({valid})
        }
        valid = await bcrypt.compare(req.payload.password, hash)
        reply({valid})
      })()
        .catch((err) => {
          reply(boom.internal(err.message))
          console.error(err.message)
        })
    }
  },
  {
    method: 'get',
    path: '/api/user/by/username/{username}',
    handler: function (req, reply) {
      (async function () {
        const results = await db.execute(sql.user.by.username, [req.params.username])
        const user = results[0]
        reply({user} || {})
      })()
        .catch((err) => {
          reply(boom.internal(err.message))
          console.error(err.message)
        })
    }
  }
]