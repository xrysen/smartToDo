$(document).ready(function() {

  $('#login-form').submit((event) => { // entire login logic, only 2 users, just for show
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
  $('.logout').on('click', () => { //shows logout button when username or pic is clicked
    const $logout = `
    <button id="logout-button" class="login-button nav-buttons nav-button">log out</button>
    `
    if (!$('#logout-button')[0]) {
      $(`#right-nav`).prepend($logout);

      $('#logout-button').on('click', () => { // click handler for logout button that is made
        $.ajax(`/api/users/logout`, { method: 'GET' })
        .then(() => location.reload());
      });
    }
  });


















})
