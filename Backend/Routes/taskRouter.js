const express = require('express');
const router = express.Router();

const {
  getAllTasks,
  createTask,
  getSpicificTask,
  updateTask,
  deleteTask
} = require('../services/TaskServices');

// Correct usage of router.route()
router.route('/')
  .get(getAllTasks)
  .post(createTask);

router.route('/:id')
  .get(getSpicificTask)
  .patch(updateTask) // or .put(updateTask)
  .delete(deleteTask);

module.exports = router;
