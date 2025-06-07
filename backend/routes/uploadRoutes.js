const express = require('express');
const upload = require('../utils/upload');
const { uploadImage } = require('../controllers/uploadController');
const router = express.Router();

router.route('/').post(upload.array("images"), uploadImage)

module.exports = router;