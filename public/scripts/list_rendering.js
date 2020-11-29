$(document).ready(function () {

  const createListElements = function (task) {
    const $task = task['name'];
    const $listElements = {
      items: $(`
      <li>
        <input type="checkbox">
        <label>${$task}</label>
      </li>
    `),

      ratings: $(`
      <li>
        <div class="rating">
          <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
        </div>
      </li>
    `),

      delete: $(`
      <li><button class='button'>Delete</button></li>
    `),

      move: $(`
      <li><button class='button move'>Move</button></li>
    `),

    };
    return $listElements;
  };

  const categoryNameToId = function (category) {
    let result;
    switch (category) {
      case 'watch':
        result = "1";
        break;
      case 'read':
        result = "2";
        break;
      case 'eat':
        result = "3";
        break;
      case 'buy':
        result = "4";
        break;
    }
    return result;
  }

  const loadListItems = function (initial, category) {
    const categoryId = categoryNameToId(category)
    $.ajax(`/api/tasks/${categoryId}`, { method: "GET" })
      .then((res) => {
        if (initial) {
          renderListElements(res, category);
        }
        if (!initial) {
          renderSingleListElement([res.pop()], category);
        }
      });
  };

  const renderSingleListElement = function (listItem, category) {
      const $items = createListElements(listItem);
      $(`#${category}-items`).append($items.items);
      $(`#${category}-ratings`).append($items.ratings);
      $(`#${category}-delete`).append($items.delete);
      $(`#${category}-move`).append($items.move);
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

  /* $('#form').submit((event) => { // form completion handler, sends user inputs to database
    event.preventDefault();
    let error = false;
    const $input = $('#todo-text');
    renderListElements($input.val(), 'read');
    $input.val('');
    if (error === false) {
      $.ajax(`/PLACEHOLDER`, {method: "POST", data: $input.serialize()}) // ajax post request to database,
        .then(() => { // clears text box, resets char counter
          $input.val('');
        })
        .then(() => loadListItems(false, read)) // loads new list item HERE is a good point to add JQUERY to make addition really noticable
        .fail((err) => console.log(err));
    }
  }); */

  loadListItems(true, 'watch');
  loadListItems(true, 'read');
  loadListItems(true, 'eat');
  loadListItems(true, 'buy');
});



