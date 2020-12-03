$(document).ready(function() {

  const isFooterVisible = function() {
    $footer = $("#footer-bottom")
    if ($footer[0].offsetTop < 692) {
      $("#down-toggle").hide();
      $("#up-toggle").hide();
    }
    if ($footer[0].offsetTop > 691) {
      $("#down-toggle").show();
    }
  }

  $("#up-toggle").hide();

  $(".new-item").hide();

  $("#new").on('click', () => {
    $(".new-item").slideDown();
    $("#new").hide();
    isFooterVisible();
  });

  $('#up-toggle').on('click', () => {
    $(window).scrollTop(0);
  })

  $('#down-toggle').on('click', () => {
    $(window).scrollTop($footer[0].offsetTop);
  })

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

  });
  window.isFooterVisible = isFooterVisible;
});

