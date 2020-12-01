$(document).ready(function () {

  let active;
  const isUserActive = function (isActive) {
    active = isActive;
  }

  // Escape function to prevent XSS injection
  const escape = (str) => {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // Create list category
  const createListCategory = function(catId, catName) {
    let listCategoryHtml = `
      <div>
        <header>
          <h2 class="list-header ${catId}-header">${catName}</h2>
        </header>
        <div class="table" id="${catId}-table">
          <div class="tr th">
            <div class="td td-checkbox">?</div>
            <div class="td td-task">item</div>
            <div class="td td-urgency">urgency</div>
            <div class="td td-move"></div>
            <div class="td td-delete"></div>
          </div>
          <div class="tr">
            <div class="td td-checkbox">X</div>
            <div class="td td-task"><span>task task task task</span></div>
            <div class="td td-urgency">5 stars</div>
            <div class="td td-move">move</div>
            <div class="td td-delete">delete</div>
          </div>
        </div>
      </div>
    `
    $('#list-section').append(listCategoryHtml);
  }

  const createListItem = function (task, isActive) {
    const checkboxElement = isActive ? '<input type="checkbox">' : '';
    const $taskName = escape(task['name']);
    const $taskId = escape(task['id']);
    const $taskCatId = escape(task['category_id']);

    const listItemHtml = `
      <div class="tr">
        <div class="td td-checkbox" id="item${$taskId}">
          ${checkboxElement}
        </div>
        <div class="td td-task" id="${$taskId}">
          <span>${$taskName}</span>
        </div>
        <div class="td td-urgency" id="rating${$taskId}">
          <span id = "rating-${$taskId}-1" onclick = "setTaskRating(${$taskId}, 1)">☆</span>
          <span id = "rating-${$taskId}-2" onclick = "setTaskRating(${$taskId}, 2)">☆</span>
          <span id = "rating-${$taskId}-3" onclick = "setTaskRating(${$taskId}, 3)">☆</span>
          <span id = "rating-${$taskId}-4" onclick = "setTaskRating(${$taskId}, 4)">☆</span>
          <span id = "rating-${$taskId}-5" onclick = "setTaskRating(${$taskId}, 5)">☆</span>
        </div>
        <div class="td td-move" id="move${$taskId}">
          <form class = "move-button" name = "move" onsubmit = "return false">
            <input type = 'submit' class = 'button move' value = "Move" onclick = "moveTaskMenu(${$taskId})"></input>
          </form>
          <span id="move-menu${$taskId}" style="display:none;">
            Move To:
            <button onclick = "moveTask(${$taskId}, 1)">Watch</button>
            <button onclick = "moveTask(${$taskId}, 2)">Read</button>
            <button onclick = "moveTask(${$taskId}, 3)">Eat</button>
            <button onclick = "moveTask(${$taskId}, 4)">Buy</button>
          </span>
        </div>
        <div class="td td-delete" id=delete"${$taskId}">
          <li id = "delete${$taskId}">
            <form name = "delete" onsubmit = "return false">
              <input type = 'submit' class='button delete-btn' value = "Delete" onclick = "deleteTask(${$taskId}, ${$taskCatId})">
              </input>
            </form>
          </li>
        </div>
      </div>
    `
    $(`#${$taskCatId}-table`).append(listItemHtml)
  }

  const createListElements = function (task, isActive) {



    const $task = task['name'];
    const $taskId = task['id'];
    const $taskCatId = task['category_id'];
    let $listElements;
    if (isActive) {
      $listElements = { // potential security flaw
        items: $(`
        <li id = "item${$taskId}">
          <input type="checkbox">
          <label>${$task}</label>
        </li>
      `),

        ratings: $(`
        <li id = "rating${$taskId}">
          <div class="rating">
            <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
          </div>
        </li>
      `),

        delete: $(`
        <li id = "delete${$taskId}"><form name = "delete" onsubmit = "return false"><input type = 'submit' class='button delete-btn' value = "Delete" onclick = "deleteTask(${$taskId}, ${$taskCatId})"></input></form></li>
      `),

        move: $(`
        <li id = "move${$taskId}"><form class = "move-button" name = "move" onsubmit = "return false"><input type = 'submit' class = 'button move' value = "Move" onclick = "moveTaskMenu(${$taskId})"></input></form>
        <span id = "move-menu${$taskId}" style = "display:none;">Move To:
        <button onclick = "moveTask(${$taskId}, 1)">Watch</button>
        <button onclick = "moveTask(${$taskId}, 2)">Read</button>
        <button onclick = "moveTask(${$taskId}, 3)">Eat</button>
        <button onclick = "moveTask(${$taskId}, 4)">Buy</button></span> </li>
      `),

      };
    }
    else {
      $listElements = { // potential security flaw
        items: $(`
        <li id = "item${$taskId}">
          <label class="strike_out">${$task}</label>
        </li>
      `),

        ratings: $(`
        <li id = "rating${$taskId}">
          <div class="rating">
            <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
          </div>
        </li>
      `),

        delete: $(`
        <li id = "delete${$taskId}"><form name = "delete" onsubmit = "return false"><input type = 'submit' class='button delete-btn' value = "Delete" onclick = "deleteTask(${$taskId}, ${$taskCatId})"></input></form></li>
      `),

        move: $(`
        <li id = "move${$taskId}"><form class = "move-button" name = "move" onsubmit = "return false"><input type = 'submit' class = 'button move' value = "Move" onclick = "moveTaskMenu(${$taskId})"></input></form>
        <span id = "move-menu${$taskId}" style = "display:none;">Move To:
        <button onclick = "moveTask(${$taskId}, 1)">Watch</button>
        <button onclick = "moveTask(${$taskId}, 2)">Read</button>
        <button onclick = "moveTask(${$taskId}, 3)">Eat</button>
        <button onclick = "moveTask(${$taskId}, 4)">Buy</button></span> </li>
      `),

      };
    }

    return $listElements;
  };

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





