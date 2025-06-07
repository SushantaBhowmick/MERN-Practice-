const express = require('express');
const { geteUserProfile, getUserTasks, updateProfile } = require('../controllers/userController');
const { isAuthenticated } = require('../middlewares/authMiddleware');
const router = express.Router();

router.route('/profile').get(isAuthenticated, geteUserProfile)
router.route('/getTasks').get(isAuthenticated, getUserTasks)
router.route('/update').put(isAuthenticated, updateProfile)
module.exports = router;