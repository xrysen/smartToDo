$(() => {
  /**
   * setTaskRating
   * Input:
   *  taskId, rating
   * Output:
   *  Makes a request to the server to update the rating of task with taskId to rating of rating
   */

  setTaskRating = (taskId, rating) => {
    $.post(`/api/tasks/ratings/${taskId}/${rating}`)
    .then(() => {
      renderRatings(taskId, rating);
    })
  }

  /**
   * renderRatings
   * Input:
   *  taskId, rating
   * Ouput:
   *  Sets the property for each star radio to true, up to and including the current rating of taskId passed in
   */
  renderRatings = (taskId, rating) => {
    for (let i = 5; i >= rating; i--) {
      $(`#${taskId}-star-${i}`).prop("checked", true);
    }
  }

  /**
   * deleteTask
   * Input:
   *  taskId, oldCatId
   * Output:
   *  Completely removes task with id of taskId from the database. Checks if that item was the last its category and removes category table it true
   */

  deleteTask = (taskId, oldCatId) => {
      closeDeletePrompt();
      $.get(`/api/tasks/delete/${taskId}`, function() {
        console.log("Deleting...");
        $(`#task-${taskId}`).remove();
        cleanCategoryIfEmpty(oldCatId)
        updateTaskCount(oldCatId)
      })
      .then(() => isFooterVisible());
  }

  /**
   * openDeletePrompt
   * Input:
   *  taskId, oldCatId
   * Output:
   *  Opens modal window asking for user confirmation on deleting of a task. Calls deleteTask if Delete is confirmed passing down taskId and oldCatId
   */

  openDeletePrompt = (taskId, oldCatId) => {
    $("body").append(
      `<div class = "modal">
        <div class = "modal-delete">
          Are you sure you want to permanently delete this task?
          <br />
          This process cannot be reversed!
          <div class = "modal-btn">
            <button class = "button modal-btn" onclick = "closeDeletePrompt()">Cancel</button>
            <button class = "button modal-btn" onclick = "deleteTask(${taskId}, ${oldCatId})">Delete</button>
          </div>
        </div>
      </div>
      `);
     $(".modal").fadeToggle();

  }

  /**
   * closeDeletePrompt
   * Output:
   *  closes modal window on delete confirm/cancel
   */

  closeDeletePrompt = () => {
    $(".modal").fadeToggle(() => {
      $(".modal").remove();
    });
  }

  /**
   * moveTaskMenu
   * Input:
   *  taskId
   * Output:
   *  Toggles whether or not the move menu is visible for the taskId passed in
   */

  moveTaskMenu = (taskId) => {
    $(`#move-menu${taskId}`).animate({width:'toggle'},400);
  }

  /**
   * moveTask
   * Input:
   *  taskId, oldCatId, newCatId
   * Output:
   *  Takes the task passed in from taskId and updates its category in the database. OldCatId is used to determine if it is the last item in the current category list
   */

  moveTask = (taskId, oldCatId, newCatId) => {
    window.lastTask = `task-${taskId}`;
    $.get(`/api/tasks/update/${taskId}/${newCatId}`)
      .then((res) => {
        $(`#task-${taskId}`).remove();
        cleanCategoryIfEmpty(oldCatId)
        updateTaskCount(oldCatId)
        // Then render this item to its (now updated) category
        renderListElements(res, true);
      })
      .then(() => {
         isFooterVisible();
        });
  }

  /**
   * completeTask
   * Input:
   *  taskId, catId
   * Output:
   *  Updates is_active to false of the task with id of taskId. Uses catId to check if it's the last item in the current category list
   */

  completeTask = (taskId, catId) => {
    $.post(`/api/tasks/archive/${taskId}`, function() {
      $(`#task-${taskId}`).fadeToggle(() => {
        $(`#task-${taskId}`).remove();
        cleanCategoryIfEmpty(catId);
        updateTaskCount(oldCatId)
      });
    });
  }

  // Remove the category if that item was the last task it contained
  cleanCategoryIfEmpty = (oldCatId) => {
    if(!$(`.taskdata-${oldCatId}`).html()) {
      $(`#cat-${oldCatId}`).html('')
    }
  }

});
