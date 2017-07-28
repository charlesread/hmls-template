'use strict'

const Loki = require('lokijs')

const db = new Loki('loki.json')

module.exports = {
  users: db.addCollection('users')
}