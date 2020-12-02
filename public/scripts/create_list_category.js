$(() => {
  // Render HTML for a list category
  const createListCategory = function(catId, catName) {
    let listCategoryHtml = `
      <div id="cat-${catId}">
        <header>
          <h2 class="list-header ${catId}-header">${catName}</h2>
        </header>
        <div class="table" id="${catId}-table">
          <div class="tr th">
            <div class="td td-checkbox"></div>
            <div class="td td-task">item</div>
            <div class="td td-urgency">urgency</div>
            <div class="td td-move">change category</div>
            <div class="td td-delete">remove task</div>
          </div>
        </div>
      </div>
    `
    return $('#list-section').append(listCategoryHtml);
  }

  window.createListCategory = createListCategory;
})

