$(document).ready(function () {

  let active;
  const isUserActive = function (isActive) {
    active = isActive;
  }

  // // Escape function to prevent XSS injection
  // const escape = (str) => {
  //   let div = document.createElement('div');
  //   div.appendChild(document.createTextNode(str));
  //   return div.innerHTML;
  // };


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

    // const tasks = listItems['tasks'];
    // for (const task in tasks) {
    //   if (tasks[task]['is_active'] === isActive) {
    //     const $items = createListElements(tasks[task], isActive);
    //     $(`#${categoryId}-items`).append($items.items);
    //     $(`#${categoryId}-ratings`).append($items.ratings);
    //     $(`#${categoryId}-delete`).append($items.delete);
    //     $(`#${categoryId}-move`).append($items.move);
    //     renderRatings(tasks[task].id, tasks[task].rating);
    //   }
    // }
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

  $('#form').submit((event) => { // form completion handler, sends user inputs to database
    event.preventDefault();
    let error = false;
    const $input = $('#todo-text');
    if (error === false) {
      $.ajax(`/api/tasks`, {method: "POST", data: $input.serialize()}) // ajax post request to database,
        .then(() => { // clears text box
          $input.val('');
        })
        .then(() => {
          $.ajax(`/api/tasks/`, { method: "GET" }) // Refactor to use response from POST
            .then((res) => {
              const task = res['tasks'].pop();
              return task['category_id']
            })
            .then((id) => loadListItems(false, id, ));
        }) // CHANGE WATCH loads new list item HERE is a good point to add JQUERY to make addition really noticable
        .fail((err) => console.log(err));
    }
  });

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





