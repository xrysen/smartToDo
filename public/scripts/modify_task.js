$(() => {

  setTaskRating = (taskId, rating) => {
    $.post(`/api/tasks/ratings/${taskId}/${rating}`)
    .then(() => {
      renderRatings(taskId, rating);
    })
  }

  renderRatings = (taskId, rating) => {
    for (let i = 5; i >= rating; i--) {
      $(`#${taskId}-star-${i}`).prop("checked", true);
    }
  }


  deleteTask = (taskId, oldCatId) => {
      closeDeletePrompt();
      $.get(`/api/tasks/delete/${taskId}`, function() {
        console.log("Deleting...");
        $(`#task-${taskId}`).remove();
        cleanCategoryIfEmpty(oldCatId)
      });
  }

  openDeletePrompt = (taskId, oldCatId) => {
    $("body").append(
      `<div class = "modal">
        <div class = "modal-delete">
          Are you sure you want to permanently delete this task?
          <br />
          This process cannot be reversed!
          <br /><br />
          <button class = "button" onclick = "closeDeletePrompt()">Cancel</button>
          <button class = "button" onclick = "deleteTask(${taskId}, ${oldCatId})">Delete</button>
        </div>
      </div>
      `);
     $(".modal").fadeToggle();

  }

  closeDeletePrompt = () => {
    $(".modal").fadeToggle(() => {
      $(".modal").remove();
    });
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

  completeTask = (taskId) => {
    $.post(`/api/tasks/archive/${taskId}`)
    .then(() => $(`#task-${taskId}`).fadeToggle());
  }

  // Remove the category if that item was the last task it contained
  cleanCategoryIfEmpty = (oldCatId) => {
    if(!$(`.taskdata-${oldCatId}`).html()) {
      $(`#cat-${oldCatId}`).html('')
    }
  }
})
