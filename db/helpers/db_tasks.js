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

const getTasksByUserId = (db, userId) => {
  return db.query(`
    SELECT tasks.*, categories.name AS category
    FROM tasks
    JOIN users ON tasks.user_id = users.id
    JOIN categories ON category_id=categories.id
    WHERE users.id = $1
  `, [userId]);
};

/**
 * getAllTasksByCategory(db, userId, catId)
 * Input:
 *  databse, user id, category id
 * Output:
 *  Returns a Promise containing all properties of table 'tasks' for a specific user and category
 */

const getTaskCategories = (db) => {
  return db.query(
    `select * from categories;`
  );
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
     WHERE id = $2
     RETURNING *;`
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
    VALUES ($1, $2, $3, TRUE, NOW(), NULL, 1, NULL)
    RETURNING *;
    `
    , [name, userId, categoryId]);
};

/**
 * setTaskComplete(db, taskId)
 * Input:
 *  database, taskId
 * Output:
 *  Sets column is_active for task with id of taskId to FALSE and adds a timestamp under date_finished column
 */

const setTaskComplete = (db, taskId) => {
  return db.query(
    `UPDATE tasks
     SET is_active = FALSE, date_finished = NOW()
     WHERE id = $1;
     `, [taskId]);
};

/**
 * setTaskActive(db, taskId)
 * Input:
 *   database, taskId
 * Output:
 *   Sets column is_active to TRUE for task with id of taskId and removes timestamp (if there is one) from column date_finished
 */

const setTaskActive = (db, taskId) => {
  return db.query(
    `UPDATE tasks
     SET is_active = TRUE, date_finished = NULL
     WHERE id = $1;
     `, [taskId]);
};

/**
 * setTasking(db, rating, taskId)
 * Input:
 *  database, rating, taskId
 * Output:
 *  Sets column rating to specified value (rating) for task with id of taskId
 */
const setTaskRating = (db, rating, taskId) => {
  return db.query(
    `UPDATE tasks
     SET rating = $1
     WHERE id = $2;
    `, [rating, taskId]);
};

/**
 * setTaskUrgency(db, urgency, taskId)
 * Input:
 *  database, urgency, taskId
 * Output:
 *  Sets column urgency to specified value (urgency) for task with id of taskId
 */

const setTaskUrgency = (db, urgency, taskId) => {
  return db.query (
    `UPDATE tasks
     SET urgency = $1
     WHERE id = $2;`, [urgency, taskId]);
};

/**
 * isTaskActive(db, taskId)
 * Input:
 *   database, taskId
 * Output:
 *  returns true or false depending on what the column is_active of row taskId is set to
 */

const isTaskActive = (db, taskId) => {
  return db.query (
    `SELECT is_active
     FROM tasks
     WHERE id = $1;`, [taskId]
  )
  .then(res => res.rows[0].is_active);
};

const getTaskRating = (db, taskId) => {
  return db.query (
    `SElECT rating
     FROM tasks
     WHERE id = $1`, [taskId]
  );
};

const deleteTask = (db, taskId) => {
  return db.query (
    `DELETE FROM tasks
    WHERE id = $1`, [taskId]);
};

module.exports = {
  getAllTasks,
  getTasksByUserId,
  // getUserTasksByCategory,
  updateTaskCategory,
  createNewTask,
  setTaskComplete,
  setTaskRating,
  setTaskUrgency,
  setTaskActive,
  isTaskActive,
  deleteTask,
  getTaskRating
};
