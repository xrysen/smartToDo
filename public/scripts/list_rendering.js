// Set global reference for category_name --> category_id
const categories = ['(dummy)', 'watch', 'read', 'eat', 'buy'];

$(document).ready(function() {

  let active;
  const isUserActive = function(isActive) {
    active = isActive;
  };

  const loadListItems = function(isActive) {
    $.ajax(`/api/tasks/`)
      .then((res) => {
        renderListElements(res.tasks, isActive);
      });
  };

  const renderListElements = function(tasks, isActive) {
    // If 'tasks' is only one it will be an object, so wrap in array
    if (!Array.isArray(tasks)) {
      tasks = [tasks];
    }
    for (const task of tasks) {
      if (!$(`#cat-${task.category_id}`).html()) {
        fillListCategory(task.category_id, categories[task.category_id]);
      }
      createListItem(task, isActive);
    }
  };

  const populateTasksOnUserActive = function() {
    $.ajax(`/api/users/active`, { method: 'GET' })
      .then((res) => {
        console.log(res);
        isUserActive(res);
        loadListItems(res);
      });
  };

  populateTasksOnUserActive();

  window.renderListElements = renderListElements;

  $('#archived').on('click', () => {
    $.ajax(`/api/users/false`, { method: 'GET' })
      .then(() => location.reload());
  });

  $('#current').on('click', () => {
    $.ajax(`/api/users/true`, { method: 'GET' })
      .then(() => location.reload());
  });

});





