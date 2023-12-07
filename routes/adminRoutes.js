const express = require('express')
const router = express.Router();
const authMiddleware = require('../middlewares/auth')

const adminControllers = require('../controllers/adminController')


router.get('/admin/getAllExpenses',authMiddleware.authenticate,adminControllers.getAllExpenses)

router.get('/admin/getExpenseById/:id',authMiddleware.authenticate,adminControllers.getExpenseById)

router.post('/admin/addNewExpense',authMiddleware.authenticate,adminControllers.addNewExpense)

router.put('/admin/updateExpense/:id',authMiddleware.authenticate,adminControllers.updateExpense)

router.delete('/admin/deleteExpense/:id',authMiddleware.authenticate,adminControllers.deleteExpense)




module.exports = router;