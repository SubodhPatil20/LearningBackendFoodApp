const express = require('express');
const { getUserController, updateUserController } = require('../controllers/userController');
const { tokenCheck } = require('../middlewares/middleware');
const router =express.Router();

router.get('/getuser',tokenCheck,getUserController);
router.put('/update-user',tokenCheck,updateUserController)

module.exports =router;