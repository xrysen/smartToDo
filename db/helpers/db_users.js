const getAllUsers = (db) => {
  return db.query(`SELECT * FROM users;`);
};

const getUserByEmail = (db, email) => {
  return db.query(
    `SELECT id, name, email FROM users
     WHERE email = $1;`, [email]);
};

const getAllTasks = (db) => {
  return db.query(`SELECT * FROM tasks`);
};

const getAllTasksForUser = (db, id) => {
  return db.query(
    `SELECT tasks.* FROM tasks
     JOIN users ON tasks.user_id = users.id
     WHERE users.id = $1`, [id]);
};

const getAllTasksForCategory = (db, userId, catId) => {
  return db.query(
    `SELECT tasks.* FROM tasks
     JOIN users ON tasks.user_id = users.id
     JOIN categories ON tasks.category_id = categories.id
     WHERE users.id = $1 AND categories.id = $2`
  , [userId, catId]);
};
