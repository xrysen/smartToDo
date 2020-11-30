const getAllUsers = (db) => {
  return db.query(`SELECT * FROM users;`);
};

const getUserByEmail = (db, email) => {
  return db.query(
    `SELECT id, name, email, password FROM users
     WHERE email = $1;`, [email]);
};

const getUserById = (db, userId) => {
  return db.query(
    `SELECT * FROM users
     WHERE users.id = $1`, [userId]);
};

const setUserState = (db, userId, isActive) => {
  return db.query(
    `UPDATE users
     SET is_active = $1
     WHERE id = $2;`
    ,[isActive, userId])
};


module.exports = {
  getUserByEmail,
  getAllUsers,
  getUserById,
  setUserState
};
