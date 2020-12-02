$(() => {
  // Render HTML for a list category
   const fillListCategory = function(catId, catName) {
    let listCategoryHtml = `
        <header>
          <h2 class="list-header ${catId}-header pointer">${catName}</h2>
        </header>
        <div class="table" id="${catId}-table">
          <div class="tr th">
            <div class="td td-checkbox"></div>
            <div class="td td-task">item</div>
            <div class="td td-urgency urgency-header">urgency</div>
            <div class="td td-move">change category</div>
            <div class="td td-delete">remove task</div>
          </div>
        </div>
    `
    $(`#cat-${catId}`).append(listCategoryHtml);

    return $(`.${catId}-header`).on('click', () => {
      $(`#${catId}-table`).slideToggle();
    });
  }

  window.fillListCategory = fillListCategory;
})

