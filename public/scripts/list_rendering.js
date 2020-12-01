$(document).ready(function () {

  let active;
  const isUserActive = function (isActive) {
    active = isActive;
  }

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

  const loadListItems = function (isActive) {
    $.ajax(`/api/tasks/`)
      .then((res) => {
        // res = a list of all users tasks (objects)
        renderListElements(res.tasks, isActive);
      });
  };

  const renderListElements = function (tasks, isActive) {
    const renderedCats = [];
    for (const task of tasks) {
      if (!renderedCats.includes(task.category_id)) {
        createListCategory(task.category_id, task.category);
      }
      createListItem(task, isActive)
    }
  };

  const populateTasksOnUserActive = function () {
    $.ajax(`/api/users/active`, { method: 'GET' })
      .then((res) => {
        console.log(res);
        isUserActive(res);
        loadListItems(res);
      })
  };

  populateTasksOnUserActive();

  $('#archived').on('click', () => {
    $.ajax(`/api/users/false`, { method: 'GET' })
      .then(() => location.reload())
    })

  $('#current').on('click', () => {
    $.ajax(`/api/users/true`, { method: 'GET' })
      .then(() => location.reload())
  })

  deleteTask = (taskId) => {
    if(confirm("Warning! This action cannot be reversed!")) {
      $.get(`/api/tasks/delete/${taskId}`, function() {
        console.log("Deleting...");
        $(`#item${taskId}`).fadeOut();
        $(`#delete${taskId}`).fadeOut();
        $(`#move${taskId}`).fadeOut();
        $(`#rating${taskId}`).fadeOut();
      });
    }
  }

  moveTaskMenu = (taskId) => {
    $(`#move-menu${taskId}`).fadeToggle();
  }

  moveTask = (taskId, newCatId) => {
    $.get(`/api/tasks/update/${taskId}/${newCatId}`)
    .then(() => {
      $(`#item${taskId}`).fadeOut();
      $(`#rating${taskId}`).fadeOut();
      $(`#delete${taskId}`).fadeOut();
      $(`#move${taskId}`).fadeOut();
      loadListItems(false, newCatId);
    });
  }});





