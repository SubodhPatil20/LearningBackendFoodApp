const express =require('express');
const { createPost, likeUnlikePost } = require('../controllers/postController');
const { tokenCheck } = require('../middlewares/middleware');
const router =express.Router();

router.get('/like-unlike/:post_id',tokenCheck,likeUnlikePost);
router.post('/create-post',tokenCheck, createPost);


module.exports =router ;