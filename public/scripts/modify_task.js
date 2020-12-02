$(() => {

  setTaskRating = (taskId, rating) => {
    $.post(`/api/tasks/ratings/${taskId}/${rating}`)
    .then(() => {
      renderRatings(taskId, rating);
    })
  }

  const renderRatings = (taskId, rating) => {
    for (let i = 5; i >= rating; i--) {
      $(`#rating-${taskId}-${i}`).text("★");
    }
  }


  deleteTask = (taskId) => {
    // if(confirm("Warning! This action cannot be reversed!")) {
      $.get(`/api/tasks/delete/${taskId}`, function() {
        console.log("Deleting...");
        $(`#task-${taskId}`).remove();
      });
    // }
  }

  moveTaskMenu = (taskId) => {
    $(`#move-menu${taskId}`).fadeToggle();
  }

  moveTask = (taskId, oldCatId, newCatId) => {
    $.get(`/api/tasks/update/${taskId}/${newCatId}`)
      .then((res) => {
        $(`#task-${taskId}`).remove();
        // Also remove the category if that item was the last task it contained
        if(!$(`.taskdata-${oldCatId}`).html()) {
          $(`#cat-${oldCatId}`).html('')
        }
        // Then render this item to its (now updated) category
        renderListElements(res, true)
      })
  }
})
