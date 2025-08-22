const { createComment, getAllCommentonPost, getAllBlogAndCommentOfUser, getPostWithParentComments } = require("../controllers/commentController");
const express=require('express');
const { tokenCheck } = require("../middlewares/middleware");
const router =express.Router();

router.post('/create-comment',tokenCheck,createComment);
router.get('/get-all-comment-on-post/:post_id',tokenCheck,getAllCommentonPost);
router.get('/get-all-blogs-and-comments-of-user/:id',tokenCheck,getAllBlogAndCommentOfUser);
router.get('/get-post-with-parent-comments/:id',tokenCheck,getPostWithParentComments);


module.exports=router;
