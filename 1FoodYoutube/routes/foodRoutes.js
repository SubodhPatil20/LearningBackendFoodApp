const express = require('express');
const { tokenCheck } = require('../middlewares/middleware');
const { createFood, getAllFood, getSingleFood } = require('../controllers/foodController');
const router =express.Router();

router.post("/create",tokenCheck,createFood);
router.get("/getAllFood",tokenCheck,getAllFood);
router.get("/getsingleFood/:id",tokenCheck,getSingleFood);


module.exports =router;