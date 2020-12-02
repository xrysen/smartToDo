$(document).ready(function () {

  let active;
  const isUserActive = function (isActive) {
    active = isActive;
  }

  const loadListItems = function (isActive) {
    $.ajax(`/api/tasks/`)
      .then((res) => {
        renderListElements(res.tasks, isActive);
      });
  };

  const renderListElements = function (tasks, isActive) {
    console.log('tasks:', tasks);
    // If 'tasks' is only one it will be an object, so wrap in array
    if (!Array.isArray(tasks)) {
      tasks = [tasks];
    }

    for (const task of tasks) {
      console.log(`calling createListCategory(${task.category_id}):`, !$(`#cat-${task.category_id}`).length);
      if (!$(`#cat-${task.category_id}`).length) {
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

  window.renderListElements = renderListElements;

  $('#archived').on('click', () => {
    $.ajax(`/api/users/false`, { method: 'GET' })
      .then(() => location.reload())
    })

  $('#current').on('click', () => {
    $.ajax(`/api/users/true`, { method: 'GET' })
      .then(() => location.reload())
  })

});





