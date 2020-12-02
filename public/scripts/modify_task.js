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


  deleteTask = (taskId, oldCatId) => {
    if(confirm("Warning! This action cannot be reversed!")) {
      $.get(`/api/tasks/delete/${taskId}`, function() {
        console.log("Deleting...");
        $(`#task-${taskId}`).remove();
        cleanCategoryIfEmpty(oldCatId)
      });
    }
  }

  moveTaskMenu = (taskId) => {
    $(`#move-menu${taskId}`).fadeToggle();
  }

  moveTask = (taskId, oldCatId, newCatId) => {
    $.get(`/api/tasks/update/${taskId}/${newCatId}`)
      .then((res) => {
        $(`#task-${taskId}`).remove();
        cleanCategoryIfEmpty(oldCatId)
        // Then render this item to its (now updated) category
        renderListElements(res, true)
      })
  }

  // Remove the category if that item was the last task it contained
  cleanCategoryIfEmpty = (oldCatId) => {
    if(!$(`.taskdata-${oldCatId}`).html()) {
      $(`#cat-${oldCatId}`).html('')
    }
  }
})
