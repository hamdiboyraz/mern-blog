const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/logout', userController.logout);
router.get('/profile', userController.profile);

// router.post(
//   '/post',
//   uploadFile.upload.single('files'),
//   userController.createPost
// );

// router.post('/post', function (req, res) {
//   console.log(uploadFile.upload.single('files'));
// });

module.exports = router;
