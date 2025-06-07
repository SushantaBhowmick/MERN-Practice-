const express = require('express');
const { isAuthenticated } = require('../middlewares/authMiddleware');
const { createTask, getAllTasks, updateTask, deleteTask, getTaskById } = require('../controllers/taskController');
const router = express.Router();

router.route('/create').post(isAuthenticated, createTask)
router.route('/getAll').get(isAuthenticated, getAllTasks)
router.route('/:id').get(isAuthenticated, getTaskById)
router.route('/:id').put(isAuthenticated, updateTask)
router.route('/:id').delete(isAuthenticated, deleteTask)
module.exports = router;