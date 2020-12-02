$(document).ready(function() {

  $(".new-item").hide();

  $("#new").on('click', () => {

    $(".new-item").slideDown();
    $("#new").hide();
  });

  $("#submit-button").on('click', () => {
    $(".new-item").slideUp();
    $("#new").show();
  });

  $(".to-read").on('click', () => {
    $("#to-read").slideToggle();
  });

  $(".to-watch").on('click', () => {
    $("#to-watch").slideToggle();
  });

  $(".to-eat").on('click', () => {
    $("#to-eat").slideToggle();
  });

  $(".to-buy").on('click', () => {
    $("#to-buy").slideToggle();
  });

/*   const hideTaskOnUserActive = function () {
    $.ajax(`/api/users/active`, { method: 'GET' })
      .then((res) => {
        isUserActive(res);
      })
  }
  const hideUnpopulatedLists = function (category) {
    $.ajax(`/api/tasks/getByCategory/${category}`, { method: 'GET' })
    .then((res) => {
      console.log(res.tasks)
      console.log(res.tasks.length)
      if (!res.tasks[0]) {
        return false;
      }
    })
    .then((res) => {
      if (res === false) {
        $(`.${category}`).hide();
      }
    })
  }
  for (let i = 1; i < 5; i++) {
    hideUnpopulatedLists(i);
  } */
});

