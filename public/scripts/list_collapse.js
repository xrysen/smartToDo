$(document).ready(function() {

  const $footer = $("#footer-bottom")
  const isFooterVisible = function() {
    const offsetTrigger = $(window).height() * 0.983;
    if ($footer[0].offsetTop <= offsetTrigger) {
      $("#down-toggle").hide();
      $("#up-toggle").hide();
    }
    if ($footer[0].offsetTop > offsetTrigger) {
      $("#down-toggle").show();
    }
  }

  const viewAdjust = function(taskId) {
    const $task = $(`#task-${taskId}`);
    ($task).get(0).scrollIntoView({behavior: "smooth", block: "center"});
  };

  $("#up-toggle").hide();

  $(".new-item").hide();

  $("#new").on('click', () => {
    $(".new-item").slideDown();
    $('#todo-text').focus();
    $("#new").hide();
    $(".new-item").get(0).scrollIntoView({behavior: "smooth", block: "center"});
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

  $(window).on('scroll', () => {
    if($(window).scrollTop() + $(window).height() === $(document).height() && $("#footer-bottom")[0].offsetTop > 930) {
      $('#down-toggle').hide();
      $("#up-toggle").show();
    }
 });

  $(window).on('scroll', () => {
    if ($(window).scrollTop() === 0 && $("#footer-bottom")[0].offsetTop > 930) {
      $('#down-toggle').show();
      $("#up-toggle").hide();
    }

  });
  window.isFooterVisible = isFooterVisible;
  window.viewAdjust = viewAdjust;
});

