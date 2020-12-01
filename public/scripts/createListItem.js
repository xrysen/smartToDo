$(() => {

  // Escape function to prevent XSS injection
  const escape = (str) => {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // Render HTML for a list item
  const createListItem = function (task, isActive) {
    const checkboxElement = isActive ? '<input type="checkbox">' : '';
    const $taskName = escape(task.name);
    const $taskId = escape(task.id);
    const $taskCatId = escape(task.category_id);

    const listItemHtml = `
      <div class="tr">
        <div class="td td-checkbox" id="item${$taskId}">
          ${checkboxElement}
        </div>
        <div class="td td-task" id="${$taskId}">
          <span>${$taskName}</span>
        </div>
        <div class="td td-urgency" id="rating${$taskId}">
          <span id="rating-${$taskId}-1" onclick="setTaskRating(${$taskId}, 1)">☆</span>
          <span id="rating-${$taskId}-2" onclick="setTaskRating(${$taskId}, 2)">☆</span>
          <span id="rating-${$taskId}-3" onclick="setTaskRating(${$taskId}, 3)">☆</span>
          <span id="rating-${$taskId}-4" onclick="setTaskRating(${$taskId}, 4)">☆</span>
          <span id="rating-${$taskId}-5" onclick="setTaskRating(${$taskId}, 5)">☆</span>
        </div>
        <div class="td td-move" id="move${$taskId}">
          <form class="move-button" name="move" onsubmit="return false">
            <input type='submit' class='button move' value="Move" onclick="moveTaskMenu(${$taskId})"></input>
          </form>
          <span id="move-menu${$taskId}" style="display:none;">
            Move To:
            <button onclick="moveTask(${$taskId}, 1)">Watch</button>
            <button onclick="moveTask(${$taskId}, 2)">Read</button>
            <button onclick="moveTask(${$taskId}, 3)">Eat</button>
            <button onclick="moveTask(${$taskId}, 4)">Buy</button>
          </span>
        </div>
        <div class="td td-delete" id=delete"${$taskId}">
          <form name="delete" onsubmit="return false">
            <input type='submit' class='button delete-btn' value="Delete" onclick="deleteTask(${$taskId}, ${$taskCatId})">
            </input>
          </form>
        </div>
      </div>
    `
    return $(`#${$taskCatId}-table`).append(listItemHtml)
  }

  window.createListItem = createListItem;
})
