const express = require('express');
const postController = require('../controllers/postController');
const uploadFile = require('../middleware/uploadFile');

const router = express.Router();

router
  .get('/', postController.getPosts)
  .post('/', uploadFile.upload.single('files'), postController.createPost)
  .put('/', uploadFile.upload.single('files'), postController.updatePost)
  .get('/:id', postController.getPostById);

module.exports = router;
