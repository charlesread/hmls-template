'use strict'

const bcrypt = require('bcrypt')
const boom = require('boom')

const db = require('~/lib/db')
const sql = require('~/lib/sql')

module.exports = [
  {
    method: 'get',
    path: '/api/user-role/by/username/{username}',
    handler: function (req, reply) {
      (async function () {
        const roles = []
        const results = await db.execute(sql.userRole.by.username, [req.params.username])
        if (results.length >= 1) {
          for (let i = 0; i < results.length; i++) {
            roles.push(results[i].role)
          }
        }
        console.log(roles)
        reply({roles})
      })()
        .catch((err) => {
          reply(boom.internal(err.message))
          console.error(err.message)
        })
    }
  }
]