const express = require('express');
const router = new express.Router();
// const Task = require('../models/Tasks');
const task_controller = require('../controllers/taskController');
const auth = require('../config/middleware/auth');


// create task
router.post('/task', auth, task_controller.create_task);

// get task
router.get('/task/:id', auth, task_controller.get_task);

// get all tasks
router.get('/all-tasks', auth, task_controller.all_tasks);

// update task
router.patch('/update-task/:id', auth, task_controller.update_task);

// delete task
router.delete('/task/:id', auth, task_controller.delete_task);

module.exports = router;