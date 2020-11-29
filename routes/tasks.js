/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const dbHelper = require('../db/helpers/db_tasks');
const categorizeTask = require('../externalApis/categorizer');

module.exports = (db) => {
  router.get("/", (req, res) => {
    const userId = req.session.userId;
    dbHelper.getTasksByUserId(db, userId)
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

  router.post("/", (req, res) => {
    const userId = req.session.userId;
    const task = req.body // TODO:: check 'task' is the query text
    console.log('Task req.body:::::::::::\n', req.body);

    const categoryId = categorizeTask(task);

    dbHelper.createNewTask = (db, task, userId, categoryId)
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
