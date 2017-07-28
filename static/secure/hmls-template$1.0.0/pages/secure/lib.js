$(document).ready(function () {
  socket.on('join', function (data) {
    $('#users').append(`<div>${data.credentials.username} joined</div>`);
  });
  socket.on('leave', function (data) {
    console.log(data);
    $('#users').append(`<div>${data.credentials.username} left</div>`);
  });
  var elements = $('#credentialsDiv input');
  var credentials = {};
  for (var i = 0; i < elements.length; i++) {
    credentials[elements[i].id] = elements[i].value;
  }
  socket.emit('credentials', credentials);
});