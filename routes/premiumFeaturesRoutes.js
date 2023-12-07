const router = require('express').Router();
const premController = require('../controllers/premiumFeaturesController')
const authMiddleware = require('../middlewares/auth')


router.get('/showLeaderBoard',authMiddleware.authenticate,premController.getLeadersData)

router.get('/downloadExpensesReport',authMiddleware.authenticate,premController.getExpenseReport)

router.get('/showPrevDownloads',authMiddleware.authenticate,premController.showUsersDownloads)

module.exports = router;
