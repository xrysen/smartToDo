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
// CODE BELOW SHOULD BE DRIED UP, FOR DEV PURPOSES
  router.get("/1", (req, res) => {
    const userId = req.session.userId;
    dbHelper.getUserTasksByCategory(db, userId, 1)
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
    dbHelper.getUserTasksByCategory(db, userId, 2)
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
    dbHelper.getUserTasksByCategory(db, userId, 3)
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
    dbHelper.getUserTasksByCategory(db, userId, 4)
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
    const task = req.body.text // important change tasks -> text
    categorizeTask(task)
      .then(categoryId => {
        return dbHelper.createNewTask(db, task, userId, categoryId)
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

  router.get("/delete/:id", (req, res) => {
    return dbHelper.deleteTask(db, req.params.id)
    .then(() => {
      console.log("Deleted from database");
      res.redirect("/");
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });

  router.get("/update/:id/:newCatId", (req, res) => {
    return dbHelper.updateTaskCategory(db, req.params.newCatId, req.params.id)
    .then(() => {
      console.log("Updated category");
      res.redirect("/");
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message })
    });
  });

  return router;
};
