const express = require('express');
const { testController } = require('../controllers/testController');
const { getUserController } = require('../controllers/userController');
const { tokenCheck } = require('../middlewares/middleware');
const router =express.Router();

router.get('/getuser',tokenCheck,getUserController)

module.exports =router;