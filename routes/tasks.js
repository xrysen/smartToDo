/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
// const dbHelper = require('')

module.exports = (db) => {
  router.get("/", (req, res) => {
    const userId = req.session.userId;
    // TODO:: import helper function
    let query = `SELECT * FROM tasks WHERE user_id=${userId}`;
    console.log(query);
    db.query(query)
      .then(data => {
        const tasks = data.rows;
        res.json({ tasks });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });


  return router;
};
