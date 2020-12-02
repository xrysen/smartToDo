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

});

