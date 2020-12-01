$(document).ready(function() {

  $('#login-form').submit((event) => {
    event.preventDefault();
    $username = $("#username-text")

    if ($username.val() === 'Bob Mango') {
      $.ajax(`/api/users/login/2`, { method: 'GET' })
      .then(() => location.reload());
    }

    if ($username.val() === 'Jim Dumpling') {
      $.ajax(`/api/users/login/1`, { method: 'GET' })
      .then(() => location.reload());
    }

  })














})
