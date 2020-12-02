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

  moveTask = (taskId, newCatId) => {
    $.get(`/api/tasks/update/${taskId}/${newCatId}`)
      .then((res) => {
        console.log('moveTask res:', res);
        $(`#task-${taskId}`).remove();
        renderListElements(res)
      })
  }
})
