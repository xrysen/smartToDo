const getAllUsers = (db) => {
  return db.query(`SELECT * FROM users;`);
};

const getUserByEmail = (db, email) => {
  return db.query(
    `SELECT id, name, email, password FROM users
     WHERE email = $1;`, [email]);
};



module.exports = {
  getUserByEmail,
  getAllUsers
};
