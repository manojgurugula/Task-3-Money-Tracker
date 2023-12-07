const express = require('express');
const router = express.Router();
const passwordController = require('../controllers/passwordController')



router.post("/forgotpassword",passwordController.forgotPassword)

router.get("/resetpassword/:id",passwordController.resetPassword)

router.get('/updatepassword/:resetpasswordid',passwordController.updatePassword)



 module.exports = router;