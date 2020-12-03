$(() => {

  // Escape function to prevent XSS injection
  const escape = (str) => {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
/*
  const hideMoveIfInactive = function() {
    readCookieActiveOrArchive()
    .then((res) => {

    })
  } */


  // Render HTML for a list item
  const createListItem = function (task, isActive) {
    const $taskName = escape(task.name).toLowerCase();
    const $taskId = escape(task.id);
    const $taskCatId = escape(task.category_id);
    const checkboxElement = isActive ? `<input type="checkbox" onclick="completeTask(${$taskId}, ${$taskCatId})">` : '';

    const listItemHtml = `
      <div class="tr taskdata-${$taskCatId}" id="task-${$taskId}">

        <div class="td td-checkbox group-a" id="item${$taskId}">
          ${checkboxElement}
        </div>

        <div class="td td-task group-a" id="${$taskId}">
          <span>${$taskName}</span>
        </div>

        <div class="td td-urgency group-c" id="rating${$taskId}">
          <div class="rating-stars">
            <input type="radio" id="${$taskId}-star-5" name="${$taskId}rate" value="5" onclick = "setTaskRating(${$taskId},5)" />
              <label for="${$taskId}-star-5" title="text">5 stars</label>
              <input type="radio" id="${$taskId}-star-4" name="${$taskId}rate" value="4" onclick = "setTaskRating(${$taskId},4)" />
              <label for="${$taskId}-star-4" title="text">4 stars</label>
              <input type="radio" id="${$taskId}-star-3" name="${$taskId}rate" value="3" onclick = "setTaskRating(${$taskId},3)" />
              <label for="${$taskId}-star-3" title="text">3 stars</label>
              <input type="radio" id="${$taskId}-star-2" name="${$taskId}rate" value="2" onclick = "setTaskRating(${$taskId},2)" />
              <label for="${$taskId}-star-2" title="text">2 stars</label>
              <input type="radio" id="${$taskId}-star-1" name="${$taskId}rate" value="1" onclick = "setTaskRating(${$taskId},1)" />
              <label for="${$taskId}-star-1" title="text">1 star</label>
          </div>
        </div>

        <div class="td td-move group-b" id="move${$taskId}">
          <form class="move-button" name="move" onsubmit="return false">
            <input type='submit' class='button move' value="move" onclick="moveTaskMenu(${$taskId})"></input>
          </form>
          <span id="move-menu${$taskId}" style="display:none;">
            <button onclick="moveTask(${$taskId}, ${$taskCatId}, 1)">watch</button>
            <button onclick="moveTask(${$taskId}, ${$taskCatId}, 2)">read</button>
            <button onclick="moveTask(${$taskId}, ${$taskCatId}, 3)">eat</button>
            <button onclick="moveTask(${$taskId}, ${$taskCatId}, 4)">buy</button>
          </span>
        </div>

        <div class="td td-delete group-b" id=delete"${$taskId}">
          <form name="delete" onsubmit="return false">
            <input type='submit' class='button delete-btn' value="delete" onclick="openDeletePrompt(${$taskId}, ${$taskCatId})">
            </input>
          </form>
        </div>

      </div>
    `
    $(`#${$taskCatId}-table`).append(listItemHtml)

    $(`#task-${$taskId}`).draggable(
      {
        axis: "y",
        cursor: "move",
        revert: "invalid"
      });

    $(`.table`).droppable(
      {
        drop: function(ev, ui) {
          const dropped = ui.draggable.attr("id");
          const taskId = dropped.substring(dropped.indexOf('-') + 1);
          switch($(this).attr("id")) {
            case "4-table":
              console.log("Moving to category 4");
              moveTask(taskId, $taskCatId, 4);
              break;
            case "3-table":
              console.log("Moving to category 3");
              moveTask(taskId, $taskCatId, 3);
              break;
            case "2-table":
              console.log("Moving to category 2");
              moveTask(taskId, $taskCatId, 2);
              break;
            case "1-table":
              console.log("Moving to category 1");
              moveTask(taskId, $taskCatId, 1);
              break;
          }
        }
      }
    );

    if (!isActive) {
      return $(".td-move").hide()/* addClass('hide-move'); */
    } else {
      return $(".td-move").show()/* removeClass('hide-move'); */
    }
  }

  window.createListItem = createListItem;
})



