$(document).ready(function () {

  const createListElements = function (task) {
    const $task = task['name'];
    const $taskId = task['id'];
    const $taskCatId = task['category_id'];
    const $listElements = {
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
      <li id = "move${$taskId}"><form name = "move" onsubmit = "return false"><input type = 'submit' class = 'button move' value = "Move" onclick = "moveTaskMenu(${$taskId})"></input></form></li>
    `),

    };
    return $listElements;
  };

  const loadListItems = function (initial, category) {
    $.ajax(`/api/tasks/${category}`, { method: "GET" })
      .then((res) => {
        if (initial) {
          renderListElements(res, category);
        }
        if (!initial) {
          renderSingleListElement(res['tasks'].pop(), category);
        }
      });
  };

  const renderListElements = function (listItems, category) {
    const tasks = listItems['tasks'];
    for (const task in tasks) {
      const $items = createListElements(tasks[task]);
      $(`#${category}-items`).append($items.items);
      $(`#${category}-ratings`).append($items.ratings);
      $(`#${category}-delete`).append($items.delete);
      $(`#${category}-move`).append($items.move);
    }
  };

  const renderSingleListElement = function (listItem, category) {
    const $items = createListElements(listItem);
    $(`#${category}-items`).append($items.items);
    $(`#${category}-ratings`).append($items.ratings);
    $(`#${category}-delete`).append($items.delete);
    $(`#${category}-move`).append($items.move);
};

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
          $.ajax(`/api/tasks/`, { method: "GET" })
            .then((res) => {
              const task = res['tasks'].pop();
              return task['category_id']
            })
            .then((id) => loadListItems(false, id));
        }) // CHANGE WATCH loads new list item HERE is a good point to add JQUERY to make addition really noticable
        .fail((err) => console.log(err));
    }
  });


  loadListItems(true, 1);
  loadListItems(true, 2);
  loadListItems(true, 3);
  loadListItems(true, 4);



  deleteTask = (taskId) => {
    $.get(`/api/tasks/delete/${taskId}`, function() {
      console.log("Deleting...");
      $(`#item${taskId}`).remove();
      $(`#delete${taskId}`).remove();
      $(`#move${taskId}`).remove();
      $(`#rating${taskId}`).remove();
    });
  }

  let editing = false;

// Buggy needs to be fixed fix

    moveTaskMenu = (taskId) => {
    console.log(`Moving...${taskId}`);
    if(!editing) {
      $(`#item${taskId}`).after(`<p class = "edit${taskId}" style = 'display: none'>Move Task: </p>`).next().slideDown();
      $(`#rating${taskId}`).after(
        `<p class = "edit${taskId}" style = 'display: none; right: 50px;'>
          <button id = "watch" onclick="moveTask(${taskId},1)">Watch</button>
          <button id = "read" onclick = "moveTask(${taskId}, 2)">Read</button>
          <button id = "eat" onclick = "moveTask(${taskId}, 3)">Eat</button>
          <button id = "buy" onclick = "moveTask(${taskId}, 4)">Buy</button></p>`).next().slideDown();
      $(`#delete${taskId}`).after(`<p class = "edit${taskId}" style = 'display: none'>&nbsp;</p>`).next().slideDown();
      $(`#move${taskId}`).after(`<p class = "edit${taskId}" style = 'display: none'>&nbsp;</p>`).next().slideDown();
      editing = true;
    } else {
      $(`.edit${taskId}`).slideUp();
      editing = false;
    }
  }

  moveTask = (taskId, newCatId) => {
    $.get(`/api/tasks/update/${taskId}/${newCatId}`)
    .then(() => {

      $(`#item${taskId}`).slideUp().next().remove();
      $(`#rating${taskId}`).slideUp().next().remove();
      $(`#delete${taskId}`).slideUp().next().remove();
      $(`#move${taskId}`).slideUp().next().remove();
      $(`.edit${taskId}`).slideUp().next().remove();
      loadListItems(false, newCatId);
    });
  }

});





