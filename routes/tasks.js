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
    dbHelper.getTasksByUserId(db, 1) //CHANGE THIS BACK TO userId
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

  router.get("/1", (req, res) => {
    const userId = req.session.userId;
    dbHelper.getUserTasksByCategory(db, 1, 1) //replace first 1 with userID
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

  router.get("/2", (req, res) => {
    const userId = req.session.userId;
    dbHelper.getUserTasksByCategory(db, 1, 2) //replace first 1 with userID
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

  router.get("/3", (req, res) => {
    const userId = req.session.userId;
    dbHelper.getUserTasksByCategory(db, 1, 3) //replace first 1 with userID
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

  router.get("/4", (req, res) => {
    const userId = req.session.userId;
    dbHelper.getUserTasksByCategory(db, 1, 4) //replace first 1 with userID
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
    const task = req.body.text
    categorizeTask(task)
      .then(categoryId => {
        return dbHelper.createNewTask(db, task, 1, categoryId) // CHANGE 1 WITH userID
      })
      .then(data => {
        const newTask = data.rows[0];
        console.log(':::newTask created:::', data.rows[0]);
        res.json({ newTask });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  return router;
};
