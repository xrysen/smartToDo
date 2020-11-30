/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const dbHelper = require('../db/helpers/db_users')


module.exports = (db) => {
  // Login form is a single input: user_id
  // which submits to GET /users/login/[user_id]
  router.get('/login/:id', (req, res) => {
    req.session.user_id = req.params.id;
    res.redirect('/');
  })

  router.get('/', (req, res) => {
    const userId = req.session.userId;
    dbHelper.getUserById(db, userId)
      .then(data => {
        const users = data.rows;
        res.json({ users });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  })

  router.post("/active", (req, res) => {
    const userId = req.session.userId;
    const  isActive = req.body.isActive // important change tasks -> text
    dbHelper.setUserState(db, userId, isActive)
    .then(data => {
      const user_state = data.rows[0];
      res.json({ user_state });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });

  return router;
};
