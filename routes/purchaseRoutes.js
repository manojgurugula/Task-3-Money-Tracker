const express = require('express');
const router = express.Router();
const authMiddleware =  require('../middlewares/auth');

const purchaseController = require('../controllers/purchaseController');

router.get('/purchase/premiumMember',authMiddleware.authenticate,purchaseController.purchasePremium)

router.post('/purchase/updateTransactionStatus',authMiddleware.authenticate,purchaseController.updateTransactionStatus)



module.exports = router;