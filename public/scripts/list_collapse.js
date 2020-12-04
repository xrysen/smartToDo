$(document).ready(function() {

  const $footer = $("#footer-bottom")
  const isFooterVisible = function() { // hides up/down toggle in case there is nowhere to scroll
    const offsetTrigger = $(window).height() * 0.983; // Triggers when footer is past a certain percentage of the window height
    if ($footer[0].offsetTop <= offsetTrigger) {
      $("#down-toggle").hide();
      $("#up-toggle").hide();
    }
    if ($footer[0].offsetTop > offsetTrigger) {
      $("#down-toggle").show();
    }
  }

  const viewAdjust = function(taskId) { // adjusts scroll to that new task is in view when added
    const $task = $(`#task-${taskId}`);
    ($task).get(0).scrollIntoView({behavior: "smooth", block: "center"});
  };

  $("#up-toggle").hide();

  $(".new-item").hide();

  $("#new").on('click', () => { // click handler for new button
    $(".new-item").slideDown();
    $('#todo-text').focus();
    $("#new").hide();
    $(".new-item").get(0).scrollIntoView({behavior: "smooth", block: "center"});
    isFooterVisible();
  });

  $('#up-toggle').on('click', () => { // click handler for scroll toggle button
    $(window).scrollTop(0);
  })

  $('#down-toggle').on('click', () => {
    $(window).scrollTop($footer[0].offsetTop);
  })

  $("#submit-button").on('click', () => { // handles new button styling effects
    $(".new-item").slideUp();
    $("#new").show();
  });

  $(window).on('scroll', () => { // handles scroll event, showing and hiding correct scroll-toggle button
    if($(window).scrollTop() + $(window).height() === $(document).height() && $("#footer-bottom")[0].offsetTop > $(window).height() * 0.983) {
      $('#down-toggle').hide();
      $("#up-toggle").show();
    }
 });

  $(window).on('scroll', () => {
    if ($(window).scrollTop() === 0 && $("#footer-bottom")[0].offsetTop > $(window).height() * 0.983) {
      $('#down-toggle').show();
      $("#up-toggle").hide();
    }

  });

  window.isFooterVisible = isFooterVisible;
  window.viewAdjust = viewAdjust;

});

