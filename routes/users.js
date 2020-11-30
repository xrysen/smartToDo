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
    req.session.userId = req.params.id;
    res.redirect('/');
  })

  router.get("/:active", (req, res) => {
    if (req.params.active === "true") {
      req.session.isActive = true;
    } else if (req.params.active === "false") {
      req.session.isActive = false;
    }
    const isActive = req.session.isActive;
    res.json( isActive );
  });

  router.get("/active", (req, res) => {
    const isActive = req.session.isActive;
    res.json( isActive );
  });

  return router;
};
