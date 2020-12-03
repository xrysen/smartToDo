$(document).ready(function() {

  $("#up-toggle").hide();

  $(".new-item").hide();

  $("#new").on('click', () => {
    $(".new-item").slideDown();
    $("#new").hide();
    isFooterVisible();
  });

  $("#submit-button").on('click', () => {
    $(".new-item").slideUp();
    $("#new").show();
  });

  $(window).scroll(function() {
    if($(window).scrollTop() + $(window).height() === $(document).height() && $("#footer-bottom")[0].offsetTop > 691) {
      $('#down-toggle').hide();
      $("#up-toggle").show();
    }
 });

  $(window).on('scroll', () => {
    if ($(window).scrollTop() === 0 && $("#footer-bottom")[0].offsetTop > 691) {
      $('#down-toggle').show();
      $("#up-toggle").hide();
    }
    /* $target.animate({scrollTop: $target.height()}, 1000); */
  });
});

