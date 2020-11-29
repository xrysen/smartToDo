


module.exports = (task) => {
  const categorizeTask = (taskText) => {
    const category = Math.floor(Math.random()*4);
    console.log('Task category is:::::', category);
    return category;
  }

  categorizeTask(task)

};
