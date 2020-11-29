$(document).ready(function () {

  const createListElements = function (listItem) {
    const $listElements = {
      items: $(`
      <li>
        <input type="checkbox">
        <label>${listItem}</label>
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

  /* const loadListItems = function (initial, category) {
    $.ajax(`/PLACEHOLDER`, { method: "GET" })
      .then((res) => {
        if (initial) {
          renderListElements(res, category);
        }
        if (!initial) {
          renderListElements([res.pop()]);
        }
      });
  }; */

  const renderListElements = function (listItems, category) {
      const $items = createListElements(listItems/* [listItem] */);
      $(`#${category}-items`).append($items.items);
      $(`#${category}-ratings`).append($items.ratings);
      $(`#${category}-delete`).append($items.delete);
      $(`#${category}-move`).append($items.move);
    /* for (const listItem in listItems) {
    } */
  };

  $('#form').submit((event) => { // form completion handler, sends user inputs to database
    event.preventDefault();
    let error = false;
    const $input = $('#todo-text');
    // note somewhere here WE call filtering function
    renderListElements($input.val(), 'read');
    $input.val('');
    /* if (error === false) {
      $.ajax(`/PLACEHOLDER`, {method: "POST", data: $input.serialize()}) // ajax post request to database,
        .then(() => { // clears text box, resets char counter
          $input.val('');
        })
        .then(() => loadListItems(false, read)) // loads new list item HERE is a good point to add JQUERY to make addition really noticable
        .fail((err) => console.log(err));
    } */
  });

  /*
  loadListItems(true, watch);
  loadListItems(true, eat);
  loadListItems(true, buy);
  loadListItems(true, read);
 */
});



