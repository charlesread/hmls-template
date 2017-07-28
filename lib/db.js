'use strict'

const mysql = require('mysql')

const config = require('~/config')

const pool = mysql.createPool(config.mysql)

module.exports.execute = function (sql, bindVars) {
  return new Promise((resolve, reject) => {
    pool.query(sql, bindVars, function (err, results) {
      if (err) {
        return reject(err)
      }
      return resolve(results)
    })
  })
}