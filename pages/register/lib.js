function isUsernameTaken (username, callback) {
  $.ajax({
    url: '/api/user/by/username/' + username,
    type: 'get',
    complete: function (xhr, status) {
      var user = xhr.responseJSON.user;
      if (user) {
        console.log('user exists');
        callback(true);
      } else {
        console.log('user does not exist');
        callback(false);
      }
    }
  });
}

function makeDanger (element, message) {
  $('.' + element).addClass('has-danger');
  $('input#' + element).addClass('form-control-danger');
  $('div.form-control-feedback.' + element).html(message);
  setTimeout(function () {
    $('.' + element).removeClass('has-danger');
    $('input#' + element).removeClass('form-control-danger');
    $('div.form-control-feedback.' + element).html('');
  }, 4000)
}

$('#submit').click(function () {
  console.log(1);
  // see if username is available
  isUsernameTaken($('#username').val(), function (isTaken) {
    if (isTaken) {
      makeDanger('username', 'Sorry, the username <code>' + $('#username').val() + '</code> is taken. Try another?');
    } else {
      var complete = true;
      var username = $('#username').val();
      var firstName = $('#firstName').val();
      var lastName = $('#lastName').val();
      var email = $('#email').val();
      var password = $('#password').val();
      var password_confirmation = $('#password_confirmation').val();
      if (!username || username.length < 4) {
        makeDanger('username', 'You need a username, and it has to be at least 4 characters!');
        complete = false;
      }
      if (!firstName) {
        makeDanger('firstName', 'You need a first name!');
        complete = false;
      }
      if (!lastName) {
        makeDanger('lastName', 'You need a last name!');
        complete = false;
      }
      if (!email) {
        makeDanger('email', 'You need an email address!');
        complete = false;
      }
      if (!password || password !== password_confirmation) {
        makeDanger('password', 'Passwords must match!');
        makeDanger('password_confirmation', 'Passwords must match!');
        complete = false;
      }
      if (complete) {
        $.ajax({
          type: 'post',
          url: '/api/user',
          contentType: 'application/json',
          dataType: 'json',
          data: JSON.stringify({
            username,
            firstName,
            lastName,
            password
          }),
          complete: function (xhr, status) {
            console.log(status);
          }
        });
      }
    }
  })
});

$('#username').keyup(function () {
  var username = $(this).val();
  if (username.length > 3) {
    $('.username').removeClass('has-warning');
    $('input#username').removeClass('form-control-warning');
    isUsernameTaken(username, function (isTaken) {
      if (isTaken) {
        makeDanger('username', 'Sorry, the username <code>' + username + '</code> is taken. Try another?');
      } else {
        $('.username').removeClass('has-danger');
        $('input#username').removeClass('form-control-danger');
        $('div.form-control-feedback.username').html('');
        $('.username').addClass('has-success');
        $('input#username').addClass('form-control-success');
        $('div.form-control-feedback.username').html('Sweet, <code>' + $('#username').val() + '</code> is available!');
      }
    });
  } else {
    $('.username').addClass('has-warning');
    $('input#username').addClass('form-control-warning');
    $('div.form-control-feedback.username').html('Your username must be at least 4 characters long.');
  }
});
