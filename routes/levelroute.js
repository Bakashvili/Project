const express = require('express');
const {
  addPost,
} = require('../Api_Controller/LevelController');

const router = express.Router();


// Add New Post
router.post('/api/post/', addPost);

module.exports = router;