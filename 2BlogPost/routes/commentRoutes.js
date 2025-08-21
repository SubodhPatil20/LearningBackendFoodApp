const { createComment } = require("../controllers/commentController");
const express=require('express');
const { tokenCheck } = require("../middlewares/middleware");
const router =express.Router();

router.post('/create-comment',tokenCheck,createComment);

module.exports=router;
