const express = require('express')
const router = express.Router();

const userControllers = require('../controllers/userController')

router.post("/user/signup",userControllers.createNewUserController);

router.post("/user/login",userControllers.authenticateUserController);


module.exports = router;