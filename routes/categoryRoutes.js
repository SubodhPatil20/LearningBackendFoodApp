const express =require('express');
const { tokenCheck } = require('../middlewares/middleware');
const { createCategory, getAllCategory, updateCategory } = require('../controllers/categoryController');
const router =express.Router();

router.post("/create",tokenCheck,createCategory)
router.get("/get-all-category",tokenCheck,getAllCategory)
router.put("/update/:id",tokenCheck,updateCategory)

module.exports =router ;