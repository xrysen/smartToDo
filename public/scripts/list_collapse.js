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
});

