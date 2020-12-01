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
  $('.username').on('click', () => {
    const $logout = `
    <button id="logout-button" class="login-button nav-buttons nav-button">log out</button>
    `
    if (!$('#logout-button')[0]) {
      console.log($('#logout-button'))
      $(`#right-nav`).prepend($logout);
      console.log($('#logout-button'))
    }
  });














})
