$(document).ready(function () {
  socket.emit('credentials', {
    username: $('#username').val(),
    firstName: $('#firstName').val()
  });
});