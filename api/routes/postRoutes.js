const express = require('express');
const postController = require('../controllers/postController');
const uploadFile = require('../middleware/uploadFile');

const router = express.Router();

router.post('/', uploadFile.upload.single('files'), postController.createPost);

module.exports = router;
