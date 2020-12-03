// Set global reference for category_name --> category_id
const categories = ['(dummy)', 'watch', 'read', 'eat', 'buy'];

$(document).ready(function() {
  // Check which page user is viewing: Active or Archived
  const readCookieActiveOrArchive = function() {
    return $.ajax(`/api/users/active`)
  };

  // Render category and each task
  const renderListElements = function(tasks) {
    readCookieActiveOrArchive()
      .then((res) => {
        // If 'tasks' is only one it will be an object, so wrap in array
        let singleTask = false;
        if (!Array.isArray(tasks)) {
          tasks = [tasks];
          singleTask = true;
        }
        for (const task of tasks) {
          // Only render tasks that match the page the user is viewing: Active vs Archived
          if (res === task.is_active) {
            // Only fill out category headers if they don't already have content
            if (!$(`#cat-${task.category_id}`).html()) {
              fillListCategory(task.category_id, categories[task.category_id]);
            }
            // Append list item html to category
            createListItem(task, res);
            renderRatings(task.id, task.rating);
            if (singleTask) {
              viewAdjust(task.id);
            }
          }
        }
      })
      .then(() => {
        isFooterVisible();
      });
  };


  // Call tasks api and send tasks json response to render function
  const loadListItems = function() {
    $.ajax(`/api/tasks/`)
      .then((res) => {
        renderListElements(res.tasks);
      });
  };
  loadListItems();

  window.renderListElements = renderListElements;
  /* window.readCookieActiveOrArchive = readCookieActiveOrArchive; */


  // Set cookie to remember which type of view user wants: Active todo's or Archived
  $('#archived').on('click', () => {
    $.ajax(`/api/users/false`, { method: 'GET' })
    .then(() => location.reload());
  });

  $('#current').on('click', () => {
    $.ajax(`/api/users/true`, { method: 'GET' })
    .then(() => location.reload());
  });

  isFooterVisible();
});





