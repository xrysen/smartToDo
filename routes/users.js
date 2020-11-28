/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  // Login form is a single input: user_id
  // which submits to GET /users/login/[user_id]
  router.get('/login/:id', (req, res) => {
    req.session.user_id = req.params.id;
    res.redirect('/');
  })

  return router;
};
