'use strict'

const url = require('url')

module.exports = function(io) {
  io.on('connection', (socket) => {
    const id = socket.id
    let credentials = {}
    const room = url.parse(socket.handshake.headers.referer).path
    console.log('socket %s connected to %s', id, room)
    socket.join(room)
    socket.on('disconnect', () => {
      console.log('socket %s disconnected from %s (%s)', id, room, credentials.username)
    })
    socket.on('credentials', function (data) {
      credentials = data
      console.log('socket %s sent credentials: %j', id, credentials)
    })
  })
}
