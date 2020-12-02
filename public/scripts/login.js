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
  $('.logout').on('click', () => {
    const $logout = `
    <button id="logout-button" class="login-button nav-buttons nav-button">log out</button>
    `
    if (!$('#logout-button')[0]) {
      $(`#right-nav`).prepend($logout);

      $('#logout-button').on('click', () => {
        $.ajax(`/api/users/logout`, { method: 'GET' })
        .then(() => location.reload());
      });
    }
  });


















})
