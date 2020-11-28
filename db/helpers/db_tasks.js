/**
 *  getAllTasks(db)
 *  Input:
 *    Database
 *  Output:
 *   Returns a Promise of all values from table 'tasks'
*/

const getAllTasks = (db) => {
  return db.query(`SELECT * FROM tasks`);
};

/**
 * getAllTasksForUser(db, userId)
 * Input:
 *  database, userId
 * Output:
 *  Returns a Promise containing all properties of table 'tasks' for the user id specified
 */

const getAllTasksForUser = (db, userId) => {
  return db.query(
    `SELECT tasks.* FROM tasks
     JOIN users ON tasks.user_id = users.id
     WHERE users.id = $1`, [userId]);
};

/**
 * getAllTasksByCategory(db, userId, catId)
 * Input:
 *  databse, user id, category id
 * Output:
 *  Returns a Promise containing all properties of table 'tasks' for a specific user and category
 */

const getAllTasksByCategory = (db, userId, catId) => {
  return db.query(
    `SELECT tasks.* FROM tasks
     JOIN users ON tasks.user_id = users.id
     JOIN categories ON tasks.category_id = categories.id
     WHERE users.id = $1 AND categories.id = $2`
    , [userId, catId]);
};

/**
 * updateTaskCategory(db, newCatId, taskId)
 * Input:
 *   database, new category id, task id
 * Output:
 *   Updates column category_id for the task id provided
 */

const updateTaskCategory = (db, newCatId, taskId) => {
  return db.query(
    `UPDATE tasks
     SET category_id = $1
     WHERE id = $2;`
    ,[newCatId, taskId]);
};

/**
 * createNewTask(db, name, userId, categoryId)
 * Input:
 *  database, name, userId, categoryId
 * Output:
 *  Inserts new row into table 'tasks' set name, user_id and category_id to provided values, and rest to defaults
 */

const createNewTask = (db, name, userId, categoryId) => {
  return db.query(
    `INSERT INTO tasks(name, user_id, category_id, is_active, date_created, date_finished, rating, urgency)
     VALUES ($1, $2, $3, TRUE, NOW(), NULL, NULL, NULL);
    `
    , [name, userId, categoryId]);
};

const setTaskComplete = (db, taskId) => {
  return db.query(
    `UPDATE tasks
     SET is_active = FALSE, date_finished = NOW()
     WHERE id = $1;
     `, [taskId]);
};

const setTaskActive = (db, taskId) => {
  return db.query(
    `UPDATE tasks
     SET is_active = TRUE, date_finished = NULL
     WHERE id = $1;
     `, [taskId]);
};


const setTaskRating = (db, rating, taskId) => {
  return db.query(
    `UPDATE tasks
     SET rating = $1
     WHERE id = $2;
    `, [rating, taskId]);
};

const setTaskUrgency = (db, urgency, taskId) => {
  return db.query (
    `UPDATE tasks
     SET urgency = $1
     WHERE id = $2;`, [urgency, taskId]);
};

module.exports = {
  getAllTasks,
  getAllTasksForUser,
  getAllTasksByCategory,
  updateTaskCategory,
  createNewTask,
  setTaskComplete,
  setTaskRating,
  setTaskUrgency,
  setTaskActive
};
