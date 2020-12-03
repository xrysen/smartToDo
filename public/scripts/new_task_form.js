$(() => {

  $('#form').submit((event) => { // form completion handler, sends user inputs to database
    event.preventDefault();
    let error = false;
    const $input = $('#todo-text');
    if (error === false) {
      $.ajax(`/api/tasks`, {method: "POST", data: $input.serialize()}) // ajax post request to database,
        .then((res) => {
          window.lastTask = `task-${res.id}`;
          renderListElements(res)
          $input.val('')
          /* isFooterVisible(); */
        })
        .catch((err) => console.log(err));
    }
  });

})
