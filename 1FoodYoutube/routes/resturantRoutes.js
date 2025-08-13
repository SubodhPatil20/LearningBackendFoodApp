const express = require('express');

const { tokenCheck } = require('../middlewares/middleware');
const { createResturantController, getAllResturantController } = require('../controllers/resturantController');
const router =express.Router();

router.post('/create',tokenCheck,createResturantController);
router.get('/get-all-resturant',tokenCheck,getAllResturantController);



module.exports =router;