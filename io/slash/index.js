'use strict'

const url = require('url')
const db = require('~/lib/loki')
const users = db.users

module.exports = function(io) {
  io.on('connection', (socket) => {
    const socketId = socket.id
    let credentials = {}
    const room = url.parse(socket.handshake.headers.referer).path
    console.log('socket %s connected to %s (credentials: %j)', socketId, room, credentials)
    socket.join(room)
    // console.log('rooms:')
    // console.log(io.sockets.adapter.rooms)
    socket.on('credentials', function (credentials) {
      console.log('socket %s sent credentials: %j', socketId, credentials)
      const user = users.insert({socketId, credentials})
      io.to(room).emit('join', user)
    })
    socket.on('disconnect', () => {
      console.log('socket %s disconnected from %s (credentials: %j)', socketId, room, credentials)
      const user = users.find({socketId})[0]
      if (user  ) {
        console.log('removing %j from db', user.credentials)
        users.remove(user)
        io.to(room).emit('leave', user)
      }
    })
  })
}
